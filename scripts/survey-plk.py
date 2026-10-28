# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "pyyaml",
# ]
# ///

from collections import Counter
import json
import yaml


INPUT_FILE = "data/Wohnprojekte in der PLK.json"
OUTPUT_FILE = "data/plk.yaml"


def process_pie_chart_questions(questions, responses, keys):
    pie_chart_data = {}
    for key in keys:
        pie_chart_data[key] = {
            "type": "pie",
            "question": questions[key],
            "responses": [response[key] for response in responses if key in response],
        }

    for key in pie_chart_data:
        pie_chart_data[key]["responses"] = dict(
            Counter(pie_chart_data[key]["responses"])
        )

    return pie_chart_data


def process_survey_questions(questions, responses, keys):
    MAP = {
        # '0': "Möglich",
        "1": "Ja",
        "2": "Nein",
    }
    bar_chart_data = {}
    for key in keys:
        bar_chart_data[key] = {
            "type": "bar",
            "question": questions[key]["question"],
            "items": questions[key]["items"],
            "responses": [[] for _ in range(len(questions[key]["items"]))],
        }
        for response in responses:
            if key in response:
                for i, answer in enumerate(response[key]):
                    if answer != "0":
                        bar_chart_data[key]["responses"][i].append(MAP[answer])

    for key in bar_chart_data:
        for i, _ in enumerate(bar_chart_data[key]["responses"]):
            bar_chart_data[key]["responses"][i] = dict(
                Counter(bar_chart_data[key]["responses"][i])
            )

        bar_chart_data[key]["responses"] = {
            value: [
                bar_chart_data[key]["responses"][i].get(value, 0)
                for i in range(len(questions[key]["items"]))
            ]
            for value in MAP.values()
        }
    return bar_chart_data


def process_multiple_choice_matrix_questions(questions, responses, keys):
    bar_chart_data = {}
    for key in keys:
        bar_chart_data[key] = {
            "type": "radar",
            "question": questions[key]["question"],
            "items": questions[key]["items"],
            "responses": [[] for _ in range(len(questions[key]["items"]))],
        }
        for response in responses:
            if key in response:
                for i, answer in enumerate(response[key]):
                    bar_chart_data[key]["responses"][i].append(
                        answer or "Keine Antwort"
                    )

    for key in bar_chart_data:
        for i, _ in enumerate(bar_chart_data[key]["responses"]):
            bar_chart_data[key]["responses"][i] = dict(
                Counter(bar_chart_data[key]["responses"][i])
            )

        answers_choices = list(
            set(
                [
                    k
                    for response_dict in bar_chart_data[key]["responses"]
                    for k in response_dict.keys()
                ]
            )
        )
        answers_choices.remove("Keine Antwort")
        answers_choices.remove("Keine Präferenz")
        answers_choices.remove("Weniger wichtig")

        bar_chart_data[key]["responses"] = {
            choice: [
                bar_chart_data[key]["responses"][i].get(choice, 0)
                for i in range(len(questions[key]["items"]))
            ]
            for choice in answers_choices
        }
    return bar_chart_data


def process_single_axis_questions(questions, responses, keys):
    single_axis_chart_data = {}
    for key in keys:
        data = [response[key] for response in responses if key in response]
        data = [int(float(response)) for response in data if response]
        data = dict(Counter(data))
        # data = dict(sorted(data.items(), key=lambda item: int(item[0])))
        data = [[int(k), v] for k, v in data.items()]
        single_axis_chart_data[key] = {
            "type": "single-axis",
            "question": questions[key],
            "responses": data,
        }
    print(single_axis_chart_data)
    return single_axis_chart_data


if __name__ == "__main__":

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    questions = data["questions"]
    responses = data["responses"]

    data = process_pie_chart_questions(
        questions, responses, ["q1", "q3", "q4", "q15", "q19"]
    )
    data |= process_survey_questions(questions, responses, ["q2", "q5", "q6", "q7"])
    data |= process_multiple_choice_matrix_questions(
        questions, responses, ["q11", "q12", "q13"]
    )
    data |= process_single_axis_questions(questions, responses, ["q8", "q9", "q16"])

    with open(OUTPUT_FILE.replace(".json", ".yaml"), "w", encoding="utf-8") as f:
        yaml.dump(data, f, allow_unicode=True, default_flow_style=False)
    print(f"Data processed and saved to {OUTPUT_FILE}")
