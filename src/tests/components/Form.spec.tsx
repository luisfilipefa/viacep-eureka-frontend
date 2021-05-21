import { CepInfo } from "../../@types/cepInfo";
import { CepInfoContext } from "../../contexts/CepInfoContext";
import Form from "../../components/Form";
import { FormProvider } from "../../contexts/FormContext";
import { render } from "@testing-library/react";

describe("Form component", () => {
  it("renders correctly", () => {
    const cepInfo = {} as CepInfo;
    const setCepInfo = jest.fn();

    const { getByText } = render(
      <CepInfoContext.Provider value={{ cepInfo, setCepInfo }}>
        <FormProvider>
          <Form />
        </FormProvider>
      </CepInfoContext.Provider>
    );

    expect(getByText("Buscar")).toBeInTheDocument();
  });

  it("render correctly when form is submitting", () => {
    jest.mock("react-hook-form", () => {
      return {
        useForm() {
          return {
            form: { formState: { isSubmitting: true } },
          };
        },
      };
    });

    const cepInfo = {} as CepInfo;
    const setCepInfo = jest.fn();

    const { debug, container } = render(
      <CepInfoContext.Provider value={{ cepInfo, setCepInfo }}>
        <FormProvider>
          <Form />
        </FormProvider>
      </CepInfoContext.Provider>
    );

    debug();
  });
});
