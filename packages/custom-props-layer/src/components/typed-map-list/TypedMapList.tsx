import { useCallback, useMemo } from "react";
import { ComponentProps } from "../../types";
import { ReactComponent as MinusIcon } from "../../assets/minus.svg";
import { ArrayLabel } from "../commons/ArrayLabel";
import { ArrayPropertyContainer } from "../commons/ArrayPropertyContainer";
import { gray900 } from "@atrilabs/design-system";
import { createObject } from "@atrilabs/canvas-runtime-utils/src/utils";
import { ArrayTypedMapCustomProp } from "@atrilabs/app-design-forest/lib/customPropsTree";

export const TypedMapList: React.FC<ComponentProps> = (props) => {
  const selector = useMemo(() => {
    return props.selector || [];
  }, [props]);

  const options = useMemo(() => {
    const options = props.attributes!.map((attribute) => attribute.fieldName);
    options.push("none");
    return options;
  }, [props.attributes]);

  const attributesMap: Map<string, object> = useMemo(() => {
    const attributesMap = new Map(
      props.attributes!.map((obj) => {
        return [obj.fieldName, obj];
      })
    );
    return attributesMap;
  }, [props.attributes]);

  const propValue = useMemo(() => {
    let currentValue = props.customProps;
    for (let prop of selector) {
      currentValue = currentValue[prop];
    }
    return currentValue || [];
  }, [props, selector]);

  const values = useMemo(() => {
    return propValue.map(
      (value: Pick<ArrayTypedMapCustomProp, "selectedOption">) =>
        value["selectedOption"]
    );
  }, [propValue]);

  const insertValueCb = useCallback(() => {
    props.patchCb({
      property: {
        custom: createObject(
          props.customProps,
          selector,
          propValue.concat({ selectedOption: "none" })
        ),
      },
    });
  }, [props, selector, propValue]);

  const editValueCb = useCallback(
    (index: number, value: string) => {
      const updatedValue = [...propValue];
      updatedValue.splice(index, 1, value);
      props.patchCb({
        property: {
          custom: createObject(
            props.customProps,
            [...selector, index, "selectedOption"],
            value
          ),
        },
      });
    },
    [propValue, props, selector]
  );

  const deleteValueCb = useCallback(
    (index: number) => {
      const updatedValue = [...propValue];
      updatedValue.splice(index, 1);
      props.patchCb({
        property: {
          custom: createObject(props.customProps, selector, updatedValue),
        },
      });
    },
    [propValue, props, selector]
  );
  console.log("TypedMapList", attributesMap);
  return (
    <ArrayPropertyContainer>
      <ArrayLabel
        onAddClick={insertValueCb}
        name={`Add a property to ${props.propName}`}
      />
      <div
        style={{ display: "flex", flexDirection: "column", rowGap: "0.5em" }}
      >
        {Array.isArray(propValue)
          ? values.map((value: string, index: number) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    columnGap: "1em",
                  }}
                >
                  <select
                    value={value}
                    onChange={(e) => {
                      editValueCb(index, e.target.value);
                    }}
                    style={{
                      height: "25px",
                      backgroundColor: gray900,
                      border: "none",
                      outline: "none",
                      color: "white",
                      padding: "0 4px",
                      minWidth: "none",
                      width: "100%",
                    }}
                  >
                    {options.map((option: string, index: number) => (
                      <option value={option} key={index}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={() => {
                      deleteValueCb(index);
                    }}
                  >
                    <MinusIcon />
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </ArrayPropertyContainer>
  );
};
