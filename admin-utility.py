import json
from typing import Dict, List

import requests

base_url = "http://thriveapp.pythonanywhere.com/api/journeys/"

welcome_message = """
+-----------------------------+
|  Welcome to Admin utility!  |
|   What do you want to do?   |
+-----------------------------+
"""

quit_instruction = "Type \\q to quit at anytime."

main_menu = """
MAIN MENU
================================
0 approve a journey
1 approve a quest
2 draft a journey with quests
3 draft a quest alone
4 view submitted journeys
5 view submitted quests
6 edit journey
7 edit quest
================================
"""

approve_body = {
    "approved": True
}

journey_string = """
ID {0}, {1} -------------------
Name: {2}
Description: {3}
Quests:
{4}
User name: {5}
Email: {6} 

"""

quest_string = """
    ID {0}, {1} ---------------
    Name: {2}
    Description: {3}
    Survey Question: {4}
"""

edit_journey_prompt = """What do you want to change?
0 name
1 description
9 nothing else
"""

edit_quest_prompt = """What do you want to change?
0 name
1 description
2 survey question
3 order
9 nothing else
"""


def check_function(user_input: str):
    if user_input.lower() == "\\q":
        exit()
    elif user_input.lower() == "\\m":
        return True


def process_input(prompt: str):
    user_input = input(prompt)
    while check_function(user_input):
        print("Invalid command \\m")
        user_input = input(prompt)
    return user_input


def approve_journey():
    jid = input("Draft Journey ID: ")

    if check_function(jid):
        return

    url = base_url + "submit-journeys/" + jid
    body = approve_body
    response = requests.patch(url, json=body)
    if response.status_code == 202:
        print("Successfully approved Journey ID " + jid + " and its quests!")
    else:
        print("Something's wrong")


def approve_quest():
    qid = input("Draft Quest ID: ")

    if check_function(qid):
        return

    url = base_url + "submit-quests/" + qid
    body = approve_body
    response = requests.patch(url, json=body)
    if response.status_code == 202:
        print("Successfully approved Quest ID " + qid + "!")
    else:
        print("Something's wrong")


def gather_quest_info() -> Dict:
    quest = {}

    quest["name"] = process_input("Quest Name: ")
    quest["description"] = process_input("Quest Description: ")
    quest["survey_question"] = process_input("Survey Question: \n"
                                             "Type 'no' if don't want to include any\n")
    if quest["survey_question"].lower() == "no":
        quest.pop("survey_question")

    return quest


def submit_journey():
    req = {}
    req["quests"] = []

    req["user_name"] = process_input("username: ")
    req["email"] = process_input("email: ")

    req["name"] = process_input("Journey name: ")
    req["description"] = process_input("Journey description: ")

    while 1:
        quest = gather_quest_info()
        req["quests"].append(quest)
        if process_input("More Quests? (y/n)").lower() == "n":
            break

    body = req
    url = base_url + "submit-journeys"
    response = requests.post(url, json=body)
    jid = response.json()[0]["id"]
    if response.status_code == 201:
        print("Success!")
        print(f"ID: {jid}")
    else:
        print("Something's wrong")


def submit_quest():
    req = {}
    req["quests"] = []

    req["user_name"] = process_input("username: ")
    req["email"] = process_input("email: ")

    quest = gather_quest_info()

    req["quests"].append(quest)

    body = req
    url = base_url + "submit-quests"
    response = requests.post(url, json=body)
    qid = response.json()[0]["id"]
    if response.status_code == 201:
        print("Success!")
        print(f"ID: {qid}")
    else:
        print("Something's wrong")


def generate_quests_string(quests: List, mode: str) -> str:
    if mode == "j":
        sorted_quests = sorted(quests, key=lambda d: d['order'])
    else:
        sorted_quests = sorted(quests, key=lambda d: d['id'])

    ret = ""

    for quest in sorted_quests:
        qid = quest["id"]
        qname = quest["name"]
        qdescription = quest["description"]
        qsurvey_question = quest["survey_question"]

        if qsurvey_question is None or qsurvey_question == "":
            qsurvey_question = "No survey question"

        if quest["approved"]:
            qapproved = "LIVE"
        else:
            qapproved = "DRAFT"

        qstring = quest_string.format(qid, qapproved, qname, qdescription, qsurvey_question)
        ret += qstring

    return ret


def get_submitted_journeys():
    url = base_url + "submit-journeys"
    response = requests.get(url)
    if not response.ok:
        print("Something's wrong")
        return

    journeys = response.json()
    ret = ""

    for journey in journeys:
        jid = journey["id"]
        jname = journey["name"]
        jdescription = journey["description"]
        user_name = journey["user_name"]
        e_mail = journey["email"]

        qstring = generate_quests_string(journey["submitted_quests"], "j")

        if journey["approved"]:
            japproved = "LIVE"
        else:
            japproved = "DRAFT"

        ret += journey_string.format(jid, japproved, jname, jdescription, qstring, user_name, e_mail)

    print("All submitted Journeys:")
    print(ret)


def get_submitted_quests():
    url = base_url + "submit-quests"
    response = requests.get(url)
    if not response.ok:
        print("Something's wrong")
        return

    quests = response.json()
    print("All Submitted Quests:")
    print(generate_quests_string(quests, "q"))


def journey_change_options() -> Dict:
    req = {}
    while 1:
        try:
            choice = int(process_input(edit_journey_prompt))
            if choice == 0:
                req["name"] = process_input("Journey name: ")
            elif choice == 1:
                req["description"] = process_input("Journey description: ")
            elif choice == 9:
                break
        except ValueError:
            print("Invalid choice")
    return req


def edit_journey():
    jid = process_input("Draft Journey ID: ")
    req = journey_change_options()
    url = base_url + "submit-journeys/" + jid
    response = requests.patch(url, json=req)
    if not response.ok:
        print("Something's wrong, did you change a journey that is already live?")
        return
    print("Changes Accepted!")


def quest_change_options() -> Dict:
    req = {}
    while 1:
        try:
            choice = int(process_input(edit_quest_prompt))
            if choice == 0:
                req["name"] = process_input("Quest name: ")
            elif choice == 1:
                req["description"] = process_input("Quest description: ")
            elif choice == 2:
                req["survey_question"] = process_input("Survey Question: ")
            elif choice == 3:
                req["order"] = process_input("Order: ")
                print("Remember to change the order of the other quests in this journey!")
            elif choice == 9:
                break
        except ValueError:
            print("Invalid choice")
    return req


def edit_quest():
    qid = process_input("Draft Quest ID: ")
    url = base_url + "submit-quests/" + qid
    req = quest_change_options()
    response = requests.patch(url, json=req)
    if not response.ok:
        print("Something's wrong, did you change a quest that is already live?")
        return
    print("Changes accepted!")


def call_choice(choice: int):
    if choice == 0:
        approve_journey()
    elif choice == 1:
        approve_quest()
    elif choice == 2:
        submit_journey()
    elif choice == 3:
        submit_quest()
    elif choice == 4:
        get_submitted_journeys()
    elif choice == 5:
        get_submitted_quests()
    elif choice == 6:
        edit_journey()
    elif choice == 7:
        edit_quest()
    else:
        print("invalid choice")


if __name__ == "__main__":
    print(welcome_message)
    print(quit_instruction)
    while 1:
        try:
            choice = input(main_menu)
            check_function(choice)
            call_choice(int(choice))
        except ValueError:
            print("Invalid input")
