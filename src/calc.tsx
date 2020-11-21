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
      return ` £${CustomsDutyValue} = `;
    } else {
      return "";
    }
  };
  const calculateVATChargedOn = (): string => {
    if (Insurance && CustomsValueOfGoods && Freight && CustomsDuty) {
      return ` £${CIFValue + CustomsDutyValue} =`;
    } else {
      return "";
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
      return ` £${CIFValue + CustomsDutyValue + VVAValue} =`;
    } else {
      return "";
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
      return ` £${VATValue} =`;
    } else {
      return "";
    }
  };
  const calculateTotalCost = (): JSX.Element => {
    if (
      Insurance &&
      CustomsValueOfGoods &&
      Freight &&
      CustomsDuty &&
      VATValueAdjustment
    ) {
      return (
        <span>
          <NumberFormat
            value={CIFValue + CustomsDutyValue + VVAValue + VATValue}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"£"}
            decimalScale={2}
          />{" "}
          =
        </span>
      );
    } else {
      return <span />;
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
  const showCIF = (): string => {
    if (CIFValue) {
      return ` £${CIFValue}`;
    } else {
      return "CIF";
    }
  };
  const showCustomsDuty = (): string => {
    if (CustomsDuty) {
      return ` ${CustomsDuty}`;
    } else {
      return "Customs Duty";
    }
  };
  const showCustomsDutyToPay = (): string => {
    if (CustomsDutyValue) {
      return ` ${CustomsDutyValue}`;
    } else {
      return "Customs Duty to pay";
    }
  };
  const showVATChargedOn = (): string => {
    if (CIFValue && CustomsDutyValue) {
      return ` ${CIFValue + CustomsDutyValue}`;
    } else {
      return "VAT charged on";
    }
  };
  const showVVA = (): string => {
    if (VVAValue) {
      return ` ${VVAValue}`;
    } else {
      return "VVA";
    }
  };
  const showTotalVATvalue = (): string => {
    if (VVAValue && CIFValue && CustomsDutyValue) {
      return ` ${VATValue / 0.2}`;
    } else {
      return "TotalV VAT value";
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
            Customs Duty to Pay = <b>{calculateCustomsDuty()}</b> {showCIF()} x
            ({showCustomsDuty()} / 100)
          </div>
          <div className="result">
            VAT is charged on = <b>{calculateVATChargedOn()}</b> {showCIF()} +{" "}
            {showCustomsDutyToPay()}
          </div>
          <div className="result">
            Total VAT Value = <b>{calculateTotalVATValue()}</b>{" "}
            {showVATChargedOn()} + {showVVA()}
          </div>
          <div className="result">
            VAT @ 20% = <b>{calculateVAT()} </b> {showTotalVATvalue()} x 0.2
          </div>
          <div className="result">
            Total Cost = <b>{calculateTotalCost()}</b>
            {showCIF()} + {showCustomsDutyToPay()} + {showVVA()} +{" "}
            {showTotalVATvalue()}
          </div>
        </div>
      </form>
    </>
  );
}
