import CepInfoItem from "../../components/cepInfoItem";
import { CepInfoProvider } from "../../contexts/CepInfoContext";
import { mocked } from "ts-jest/utils";
import { render } from "@testing-library/react";
import { useCepInfo } from "../../hooks/useCepInfo";

jest.mock("../../hooks/useCepInfo");

describe("CepInfoItem component", () => {
  it("renders correctly when cep info is not found", () => {
    const useCepInfoMocked = mocked(useCepInfo);

    useCepInfoMocked.mockReturnValueOnce({
      cepInfo: { cep: "" },
      setCepInfo: jest.fn(),
    } as any);

    const { getByText } = render(
      <CepInfoProvider>
        <CepInfoItem />
      </CepInfoProvider>
    );

    expect(
      getByText("Ops, não consegui encontrar nenhuma informação.")
    ).toBeInTheDocument();
  });

  it("renders correctly when cep info is found", () => {
    const useCepInfoMocked = mocked(useCepInfo);

    useCepInfoMocked.mockReturnValueOnce({
      cepInfo: { cep: "86430000" },
      setCepInfo: jest.fn(),
    } as any);

    const { getByText } = render(
      <CepInfoProvider>
        <CepInfoItem />
      </CepInfoProvider>
    );

    expect(getByText("CEP 86430000")).toBeInTheDocument();
  });
});
