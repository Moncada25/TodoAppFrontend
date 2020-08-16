import { TestBed } from "@angular/core/testing";

import { GamesService } from "./game.service";

describe("GameService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: GamesService = TestBed.get(GamesService);
    expect(service).toBeTruthy();
  });
});
