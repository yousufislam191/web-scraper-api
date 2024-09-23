/// <reference types="jest" />

import { Request, Response, NextFunction } from "express";
import { getOllyoData } from "../../src/services/ollyo.service";
import { getOllyoDataController } from "../../src/controllers/ollyo.controller";

jest.mock("../../src/services/auth.service");
jest.mock("../../src/services/ollyo.service");

describe("getOllyoDataController", () => {
  let req: Partial<Request>;
  let res: Partial<Response> & { status: jest.Mock; json: jest.Mock };
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it("should return job data", async () => {
    const mockData = {
      msg: "Data inserted successfully",
      data: [
        {
          title: "Full-stack Developer",
          team: "engineering",
          vacancy: "2",
          salary: "100,000-150,000 BDT/ month",
          href: "https://jobs.ollyo.com/opening/7/full-stack-developer",
        },
        // ... other job data
      ],
    };

    // Mock the getOllyoData function to return the mockData
    (getOllyoData as jest.Mock).mockResolvedValue(mockData);

    await getOllyoDataController(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });
});
