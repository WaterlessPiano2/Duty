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
        <label htmlFor="customsDuty">Customs Duty</label>
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
            Cost, Insurance and Freight (CIF) price ={" "}
            {Insurance && CustomsValueOfGoods && Freight
              ? ` £${
                  Number(Insurance) +
                  Number(CustomsValueOfGoods) +
                  Number(Freight)
                } = `
              : ""}
            {CustomsValueOfGoods
              ? `£${CustomsValueOfGoods}`
              : "Customs Value of Goods"}{" "}
            + {Insurance ? `£${Insurance}` : "Insurance"} +{" "}
            {Freight ? `£${Freight}` : "Freight"}
          </div>
          <div className="result">Customs Duty = {"135"}</div>
          <div className="result">VAT = {"135"}</div>
          <div className="result">Total Cost = {"135"}</div>
        </div>
      </form>
    </>
  );
}
