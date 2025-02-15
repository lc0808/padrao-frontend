import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests", // Diretório onde os testes estarão
  timeout: 30 * 1000, // Timeout global para os testes
  expect: {
    timeout: 5000, // Timeout para expectativas
  },
  fullyParallel: true, // Executar testes em paralelo
  retries: 2, // Número de tentativas em caso de falha
  workers: process.env.CI ? 1 : undefined, // Número de workers (1 em CI, indefinido localmente)
  reporter: "html", // Gerar relatório HTML
  use: {
    actionTimeout: 0, // Timeout para ações
    trace: "on-first-retry", // Capturar trace em caso de falha
    baseURL: "http://localhost:3000", // URL base para os testes
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
};

export default config;
