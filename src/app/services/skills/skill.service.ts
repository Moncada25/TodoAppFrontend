import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Skill } from "../../models/skill";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SkillsService {
  constructor(private readonly http: HttpClient) { }

  getUserSkills(user: string | number): Observable<Skill[]> {
    return this.http.get<Skill[]>(environment.API_URL + "/skills/" + user);
  }

  saveSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(environment.API_URL + "/skills/", skill);
  }

  deleteSkill(id: string): Observable<Skill> {
    return this.http.delete<Skill>(environment.API_URL + "/skills/" + id);
  }
}
