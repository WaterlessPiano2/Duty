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
  const { register, watch, errors } = useForm<IFormInput>({
    mode: "onChange",
  });

  const CustomsValueOfGoods: number = watch("CustomsValueOfGoods");
  const Insurance: number = watch("Insurance");
  const Freight: number = watch("Freight");
  const CustomsDuty: number = watch("CustomsDuty");
  const VATValueAdjustment: number = watch("VATValueAdjustment");
  const calculateCIF = (): string => {
    if (Insurance && CustomsValueOfGoods && Freight) {
      return ` £${
        Number(Insurance) + Number(CustomsValueOfGoods) + Number(Freight)
      } = `;
    } else {
      return "";
    }
  };
  const calculateCustomsDuty = (): string => {
    if (Insurance && CustomsValueOfGoods && Freight && CustomsDuty) {
      return ` £${
        (Number(Insurance) + Number(CustomsValueOfGoods) + Number(Freight)) *
        (CustomsDuty / 100)
      }`;
    } else {
      return "CIF x (Customs Duty Percentage / 100)";
    }
  };
  const calculateVATChargedOn = (): string => {
    if (Insurance && CustomsValueOfGoods && Freight && CustomsDuty) {
      return ` £${
        Number(Insurance) +
        Number(CustomsValueOfGoods) +
        Number(Freight) +
        (Number(Insurance) + Number(CustomsValueOfGoods) + Number(Freight)) *
          (CustomsDuty / 100)
      }`;
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
      return ` £${
        Number(Insurance) +
        Number(CustomsValueOfGoods) +
        Number(Freight) +
        (Number(Insurance) + Number(CustomsValueOfGoods) + Number(Freight)) *
          (CustomsDuty / 100) +
        Number(VATValueAdjustment)
      }`;
    } else {
      return "CIF + Customs Duty to Pay + VAT Value Adjustment";
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

  if (errors) {
    console.log("errors");
    console.log(errors);
  }

  return (
    <>
      <form aria-label="Duty Calculator" name="form">
        <label htmlFor="customsValueOfGoods">Customs Value Of Goods</label>
        <input
          type="number"
          id="customsValueOfGoods"
          placeholder="Customs Value Of Goods"
          name="CustomsValueOfGoods"
          ref={register({ required: true, max: 9999999, min: 0, maxLength: 8 })}
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
        <label htmlFor="VATValueAdjustment">VAT Value Adjustment</label>
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
        </div>
      </form>
    </>
  );
}
