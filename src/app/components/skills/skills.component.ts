import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Skill } from "../../models/skill";
import { SkillsService } from "../../services/skills/skill.service";
import { Alerts } from "../../helpers/alerts";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from "@angular/forms";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.css"],
})
export class SkillsComponent implements OnInit {
  @Input() userId: number;
  @Output() skillsUser = new EventEmitter<number>();
  skills: Skill[] = [];
  levels: string[];
  skill: Skill = {};
  alerts = new Alerts();
  skillForm: FormGroup;

  constructor(
    private readonly skillsService: SkillsService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.levels = [
      "Select level",
      "Fundamental",
      "Novice",
      "Intermediate",
      "Advanced",
      "Expert",
    ];

    this.getUserSkills();
    this.createSkillForm();
  }

  private sendSkillsLength(): void {
    this.skillsUser.emit(this.skills.length);
  }

  private getUserSkills(): void {

    this.skillsService.getUserSkills(this.userId).subscribe(
      (res) => {
        this.skills = res;
        this.sendSkillsLength();
      },
    );
  }

  newSkill(): void {
    const selectLevel = document.getElementById(
      "selectLevel"
    ) as HTMLSelectElement;

    if (selectLevel.value !== "Select level") {
      delete this.skill.id;
      delete this.skill.declared_at;

      const newSkill: Skill = {
        ...this.skill,
        ...this.skillForm.value,
      };

      newSkill.id_user = this.userId;

      this.skillsService.saveSkill(newSkill).subscribe(
        () => {
          this.alerts.showAlert(
            "Yeah!",
            "The skill was added successfully!",
            "success"
          );

          this.getUserSkills();
        },
        (err) => console.error(err)
      );

      selectLevel.value = this.levels[0];
      this.skillForm.get("name").setValue("");
    } else {
      this.alerts.showToastAlert(
        "Verify!",
        "The level no was selected",
        "info"
      );
    }
  }

  deleteSkill(): void {
    if (this.skills.length > 0) {
      const items = document.getElementsByClassName("list-group-item active");

      if (items.length > 0) {
        this.alerts
          .showAlertConfirm(
            "Are you sure?",
            "Once deleted, you will not be able to recover this skill!",
            "warning"
          )
          .then((willDelete) => {
            if (willDelete.value) {
              for (let i = 0; i < items.length; i++) {
                const idSkillSelected = items.item(i).getAttribute("value");
                this.skillsService
                  .deleteSkill(idSkillSelected)
                  .subscribe(() => {
                    this.getUserSkills();
                  });
              }

              this.alerts.showAlert("Yeah!", "Skills deleted!", "success");
            }
          });
      } else {
        this.alerts.showToastAlert(
          "Verify!",
          "Skills no were selected",
          "info"
        );
      }
    } else {
      this.alerts.showToastAlert(
        "Add one!",
        "You have no added skills",
        "info"
      );
    }
  }

  setLevel(levelSelected: string): void {
    let valueLevel = "";

    switch (levelSelected) {
      case "Fundamental":
        valueLevel = "5";
        break;
      case "Novice":
        valueLevel = "25";
        break;
      case "Intermediate":
        valueLevel = "50";
        break;
      case "Advanced":
        valueLevel = "75";
        break;
      case "Expert":
        valueLevel = "100";
        break;
    }

    this.skill.level_name = levelSelected;
    this.skill.level_value = valueLevel;
  }

  changeStatus(item: HTMLButtonElement): void {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    } else {
      item.classList.add("active");
    }
  }

  createSkillForm(): void {
    this.skillForm = this.formBuilder.group({
      name: new FormControl(this.skill.name, [
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    });
  }
}
