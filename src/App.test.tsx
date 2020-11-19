import React from "react";
import {
  fireEvent,
  getByLabelText,
  render,
  screen,
} from "@testing-library/react";

import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText("Duty Calculator");
  expect(linkElement).toBeInTheDocument();
});

test("On load no output", () => {
  render(<App />);
  const CIF = screen.getByText(
    "Cost, Insurance and Freight (CIF) price = Customs Value of Goods + Insurance + Freight"
  );
  expect(CIF).toBeInTheDocument();

  const Duty = screen.getByText(
    "Customs Duty to Pay = CIF x (Customs Duty Percentage / 100)"
  );
  expect(Duty).toBeInTheDocument();
  const VATOn = screen.getByText(
    "VAT is charged on = CIF + Customs Duty to Pay"
  );
  expect(VATOn).toBeInTheDocument();
  const TotalVAT = screen.getByText("Total VAT Value = VAT Charged on + VVA");
  expect(TotalVAT).toBeInTheDocument();
  const VAT = screen.getByText("VAT @ 20% = Total VAT Value x 0.2");
  expect(VAT).toBeInTheDocument();
  const Total = screen.getByText("Total Cost = Total VAT Value + VAT");
  expect(Total).toBeInTheDocument();
});

const setup = () => {
  const utils = render(<App />);
  const input = utils.getByLabelText("Customs Value of Goods");
  return {
    input,
    ...utils,
  };
};

test("Fills the form", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "23" } });
  expect(input.value).toBe("23");
  const CIF = screen.getByText(
    "Cost, Insurance and Freight (CIF) price = £23 + Insurance + Freight"
  );
  console.log("------------------------------------------------");
  expect(CIF).toBeInTheDocument();
});
