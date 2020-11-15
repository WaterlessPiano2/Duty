import React from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  CustomsValueOfGoods: number;
  Insurance: number;
  Freight: number;
  CustomsDuty: number;
  VATValueAdjustment: number;
}

export default function Calculator(): JSX.Element {
  const { register, watch } = useForm<IFormInput>({
    mode: "onChange",
  });

  //Watchers
  const CustomsValueOfGoods: number = watch("CustomsValueOfGoods"),
    Insurance: number = watch("Insurance"),
    Freight: number = watch("Freight"),
    CustomsDuty: number = watch("CustomsDuty"),
    VATValueAdjustment: number = watch("VATValueAdjustment"),
    // Common calculations
    CIFValue: number =
      Number(Insurance) + Number(CustomsValueOfGoods) + Number(Freight),
    CustomsDutyValue: number = CIFValue * (CustomsDuty / 100),
    VVAValue = Number(VATValueAdjustment),
    VATValue: number = (CIFValue + CustomsDutyValue + VVAValue) * 0.2;

  const calculateCIF = (): string => {
    if (Insurance && CustomsValueOfGoods && Freight) {
      return ` £${CIFValue} = `;
    } else {
      return "";
    }
  };
  const calculateCustomsDuty = (): string => {
    if (Insurance && CustomsValueOfGoods && Freight && CustomsDuty) {
      return ` £${CustomsDutyValue}`;
    } else {
      return "CIF x (Customs Duty Percentage / 100)";
    }
  };
  const calculateVATChargedOn = (): string => {
    if (Insurance && CustomsValueOfGoods && Freight && CustomsDuty) {
      return ` £${CIFValue + CustomsDutyValue}`;
    } else {
      return "CIF + Customs Duty to Pay";
    }
  };
  const calculateTotalVATValue = (): string => {
    if (
      Insurance &&
      CustomsValueOfGoods &&
      Freight &&
      CustomsDuty &&
      VATValueAdjustment
    ) {
      return ` £${CIFValue + CustomsDutyValue + VVAValue}`;
    } else {
      return "VAT Charged on + VVA";
    }
  };
  const calculateVAT = (): string => {
    if (
      Insurance &&
      CustomsValueOfGoods &&
      Freight &&
      CustomsDuty &&
      VATValueAdjustment
    ) {
      return ` £${VATValue}`;
    } else {
      return "Total VAT Value x 0.2";
    }
  };
  const calculateTotalCost = (): string => {
    if (
      Insurance &&
      CustomsValueOfGoods &&
      Freight &&
      CustomsDuty &&
      VATValueAdjustment
    ) {
      return ` £${CIFValue + CustomsDutyValue + VVAValue + VATValue}`;
    } else {
      return "Total VAT Value + VAT ";
    }
  };
  const showCustomsValueOfGoods = (): string => {
    if (CustomsValueOfGoods) {
      return ` £${CustomsValueOfGoods}`;
    } else {
      return "Customs Value of Goods";
    }
  };
  const showInsurance = (): string => {
    if (Insurance) {
      return ` £${Insurance}`;
    } else {
      return "Insurance";
    }
  };
  const showFreight = (): string => {
    if (Freight) {
      return ` £${Freight}`;
    } else {
      return "Freight";
    }
  };

  return (
    <>
      <form aria-label="Duty Calculator" name="form">
        <label htmlFor="customsValueOfGoods">Customs Value of Goods</label>
        <input
          type="number"
          id="customsValueOfGoods"
          placeholder="Customs Value of Goods"
          name="CustomsValueOfGoods"
          ref={register({
            required: true,
            max: 9999999,
            min: 0,
            maxLength: 8,
          })}
        />
        <label htmlFor="Insurance">Insurance</label>
        <input
          type="number"
          id="Insurance"
          placeholder="Insurance"
          name="Insurance"
          ref={register({ required: true, max: 9999999, min: 0, maxLength: 8 })}
        />
        <label htmlFor="Freight">Freight</label>
        <input
          type="number"
          id="Freight"
          placeholder="Freight"
          name="Freight"
          ref={register({ required: true, max: 9999999, min: 0, maxLength: 8 })}
        />
        <label htmlFor="customsDuty">Customs Duty (%)</label>
        <input
          type="number"
          id="customsDuty"
          placeholder="Customs Duty"
          name="CustomsDuty"
          ref={register({ required: true, max: 9999999, min: 0, maxLength: 8 })}
        />
        <label htmlFor="VATValueAdjustment">VAT Value Adjustment (VVA)</label>
        <input
          type="number"
          id="VATValueAdjustment"
          placeholder="VAT Value Adjustment"
          name="VATValueAdjustment"
          ref={register({ required: true, max: 500, min: 0, maxLength: 3 })}
        />

        <div className="results">
          <div className="result">
            Cost, Insurance and Freight (CIF) price = <b>{calculateCIF()}</b>
            {showCustomsValueOfGoods()} + {showInsurance()} + {showFreight()}
          </div>
          <div className="result">
            Customs Duty to Pay = {calculateCustomsDuty()}
          </div>
          <div className="result">
            VAT is charged on = {calculateVATChargedOn()}
          </div>
          <div className="result">
            Total VAT Value = {calculateTotalVATValue()}
          </div>
          <div className="result">VAT @ 20% = {calculateVAT()}</div>
          <div className="result">Total Cost = {calculateTotalCost()}</div>
        </div>
      </form>
    </>
  );
}
