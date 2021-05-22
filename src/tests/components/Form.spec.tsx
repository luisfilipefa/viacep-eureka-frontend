import { fireEvent, render } from "@testing-library/react";

import { CepInfoProvider } from "../../contexts/CepInfoContext";
import Form from "../../components/Form";
import { FormContext } from "../../contexts/FormContext";
import { mocked } from "ts-jest/utils";
import { useForm } from "react-hook-form";

jest.mock("react-hook-form");

describe("Form component", () => {
  it("renders correctly", () => {
    const form = {
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { isSubmitting: false, errors: { cep: {} } },
    } as any;
    const useFormMocked = mocked(useForm);

    useFormMocked.mockReturnValueOnce(form);

    const { getByText } = render(
      <CepInfoProvider>
        <FormContext.Provider
          value={{ form, onSubmit: jest.fn(), handleClearSearch: jest.fn() }}
        >
          <Form />
        </FormContext.Provider>
      </CepInfoProvider>
    );

    expect(getByText("Buscar")).toBeInTheDocument();
  });

  it("renders correctly when is submitting", () => {
    const form = {
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { isSubmitting: true, errors: { cep: {} } },
    } as any;
    const useFormMocked = mocked(useForm);

    useFormMocked.mockReturnValueOnce(form);

    const { container } = render(
      <CepInfoProvider>
        <FormContext.Provider
          value={{ form, onSubmit: jest.fn(), handleClearSearch: jest.fn() }}
        >
          <Form />
        </FormContext.Provider>
      </CepInfoProvider>
    );

    expect(container.querySelector(".spinner")).toBeInTheDocument();
  });

  it("renders error message when input has less or more then 8 characters", () => {
    const form = {
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { isSubmitting: false, errors: { cep: { type: "min" } } },
    } as any;
    const useFormMocked = mocked(useForm);

    useFormMocked.mockReturnValueOnce(form);

    const { getByText } = render(
      <CepInfoProvider>
        <FormContext.Provider
          value={{ form, onSubmit: jest.fn(), handleClearSearch: jest.fn() }}
        >
          <Form />
        </FormContext.Provider>
      </CepInfoProvider>
    );

    expect(
      getByText("CEP deve possuir no mínimo 8 caracteres")
    ).toBeInTheDocument();
  });

  it("calls handleSubmit when form is submitted", () => {
    const { handleSubmit } = useForm();
    const form = {
      register: jest.fn(),
      handleSubmit,
      formState: { isSubmitting: false, errors: { cep: {} } },
    } as any;
    const useFormMocked = mocked(useForm);

    useFormMocked.mockReturnValueOnce(form);

    const { container } = render(
      <CepInfoProvider>
        <FormContext.Provider
          value={{ form, onSubmit: jest.fn(), handleClearSearch: jest.fn() }}
        >
          <Form />
        </FormContext.Provider>
      </CepInfoProvider>
    );

    const formElem = container.querySelector(".form");

    fireEvent.submit(formElem);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
