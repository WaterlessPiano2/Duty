import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";

type INumericInput = number | undefined;

interface IFormInput {
  CustomsValueOfGoods: number | undefined;
  Insurance: number;
  Freight: number;
  CustomsDuty: number;
  VATValueAdjustment: number;
}

export default function Calculator(): JSX.Element {
  const { register, watch } = useForm<IFormInput>({
    mode: "onChange",
  });
  const [CustomsValueOfGoods, setCustomsValueOfGoods] = useState<INumericInput>(
    0
  );
  const [Insurance, setInsurance] = useState<INumericInput>(0);
  const [Freight, setFreight] = useState<INumericInput>(0);
  const [VATValueAdjustment, setVATValueAdjustment] = useState<INumericInput>(
    0
  );
  //watcher
  const CustomsDuty: number = watch("CustomsDuty"),
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
        <label htmlFor="CustomsValueOfGoods">Customs Value of Goods</label>
        <NumberFormat
          id="CustomsValueOfGoods"
          placeholder="Customs Value of Goods"
          name="CustomsValueOfGoods"
          thousandSeparator={true}
          decimalScale={2}
          isNumericString
          prefix={"£ "}
          allowNegative={false}
          ref={register}
          onValueChange={(target) => {
            setCustomsValueOfGoods(target.floatValue);
          }}
        />
        <label htmlFor="Insurance">Insurance</label>
        <NumberFormat
          id="Insurance"
          placeholder="Insurance"
          name="Insurance"
          thousandSeparator={true}
          decimalScale={2}
          isNumericString
          prefix={"£ "}
          allowNegative={false}
          ref={register}
          onValueChange={(target) => {
            setInsurance(target.floatValue);
          }}
        />
        <label htmlFor="Freight">Freight</label>
        <NumberFormat
          id="Freight"
          placeholder="Freight"
          name="Freight"
          thousandSeparator={true}
          decimalScale={2}
          isNumericString
          prefix={"£ "}
          allowNegative={false}
          ref={register}
          onValueChange={(target) => {
            setFreight(target.floatValue);
          }}
        />
        <label htmlFor="customsDuty">Customs Duty (%)</label>
        <input
          type="number"
          id="customsDuty"
          placeholder="Customs Duty"
          name="CustomsDuty"
          ref={register({ required: false, max: 100, min: 0, maxLength: 3 })}
        />
        <label htmlFor="VATValueAdjustment">VAT Value Adjustment (VVA)</label>
        <NumberFormat
          id="VATValueAdjustment"
          placeholder="VAT Value Adjustment"
          name="VATValueAdjustment"
          thousandSeparator={true}
          decimalScale={2}
          isNumericString
          prefix={"£ "}
          allowNegative={false}
          ref={register}
          onValueChange={(target) => {
            setVATValueAdjustment(target.floatValue);
          }}
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
