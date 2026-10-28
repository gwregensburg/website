.PHONY: start
start:
	hugo server -D

.PHONY: init
init:
	git submodule update --init --recursive

.PHONY: evaluate-plk-survey
evaluate-plk-survey:
	@echo "Evaluating PLK survey..."
	@echo "Make sure the exported survey results are at data/Wohnprojekte in der PLK.json (never commit them)"
	@uv run scripts/survey-plk.py
