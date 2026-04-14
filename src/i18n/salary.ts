export type SalaryLang = 'hr' | 'en'

export interface SalaryTranslations {
	pageLabel: string
	pageTitle: string
	pageSubtitle: (lawLink: string) => string
	grossSalary: string
	placeholder: string
	taxRatesLabel: string
	taxRatesArticle: string
	lowerPct: string
	higherPct: string
	personalAllowanceLabel: string
	coefLabel: string
	dependentChildren: string
	dependentFamily: string
	disability03: string
	disability10: string
	gross: string
	net: string
	lostMonthly: string
	yearlyNet: string
	yearlyGross: string
	yearlyLoss: string
	howCalculated: string
	howCalculatedSub: string
	step01Title: string
	step01Article: string
	step01Desc: string
	step01Remaining: string
	step02Title: string
	step02Article: string
	step02Desc: (amount: string) => string
	step02Children: string
	step02Family: string
	step02Disability: string
	step02Disability100: string
	step02TotalCoef: string
	step02TotalAllowance: (amount: string) => string
	step02SubtractFrom: (remaining: string, allowance: string) => string
	step02TaxableBase: string
	step02NoTax: string
	step02BelowAllowance: (net: string) => string
	step03Title: string
	step03Article: string
	step03Desc: (lower: number, threshold: string, higher: number) => string
	totalLabel: string
	pensionLabel: string
	incomeTaxLabel: string
	totalDeductions: string
	netSalary: string
	author: string
	chartGross: string
	chartPercent: string
	chartNet: string
	chartDiff: string
	chartTax: string
	langSwitch: string
	langSwitchPath: string
}

const hr: SalaryTranslations = {
	pageLabel: 'kalkulator',
	pageTitle: 'Porez na dohodak',
	pageSubtitle: (lawLink) => `Izračun neto plaće prema <a href="${lawLink}">Zakonu o porezu na dohodak</a> — verzija za 2025. (NN 152/24)`,
	grossSalary: 'Bruto plaća',
	placeholder: '2000',
	taxRatesLabel: 'Porezne stope općine/grada',
	taxRatesArticle: 'čl. 19.a',
	lowerPct: '% niža',
	higherPct: '% viša',
	personalAllowanceLabel: 'Osobni odbitak',
	coefLabel: 'koef.',
	dependentChildren: 'Uzdržavana djeca',
	dependentFamily: 'Uzdržavani članovi obitelji',
	disability03: 'Invalidnost (koef. 0,3)',
	disability10: 'Invalidnost 100% (koef. 1,0)',
	gross: 'Bruto',
	net: 'Neto',
	lostMonthly: 'izgubljeno mjesečno',
	yearlyNet: 'Godišnje neto',
	yearlyGross: 'Godišnje bruto',
	yearlyLoss: 'Godišnji gubitak',
	howCalculated: 'Kako se izračunava?',
	howCalculatedSub: 'Korak-po-korak izračun za zadani unos.',
	step01Title: 'Mirovinsko osiguranje',
	step01Article: 'čl. 23',
	step01Desc: '20% bruto plaće odlazi u mirovinsko osiguranje — 15% u I. stup i 5% u II. stup.',
	step01Remaining: 'preostaje',
	step02Title: 'Osobni odbitak',
	step02Article: 'čl. 14',
	step02Desc: (amount) => `Neoporezivi dio plaće koji se ne oporezuje. Osnovni odbitak: <span class="text-text font-mono">${amount}€</span>.`,
	step02Children: 'Djeca',
	step02Family: 'Uzdržavani članovi',
	step02Disability: 'Invalidnost',
	step02Disability100: 'Invalidnost 100%',
	step02TotalCoef: 'Ukupni koef.',
	step02TotalAllowance: (amount) => `Ukupni odbitak: <span class="text-text font-mono">${amount}€</span>.`,
	step02SubtractFrom: (remaining, allowance) => `Od prethodnih ${remaining}€ oduzimamo ${allowance}€ odbitka.`,
	step02TaxableBase: 'oporeziva baza',
	step02NoTax: 'Nema poreza',
	step02BelowAllowance: (net) => `prihod ispod odbitka — neto = ${net}€`,
	step03Title: 'Porez na dohodak',
	step03Article: 'čl. 19.a / čl. 24',
	step03Desc: (lower, threshold, higher) => `Niža stopa (${lower}%) do ${threshold}€, viša stopa (${higher}%) iznad. Stope određuje općina/grad (čl. 19.a). Prirez je ukinut od 2025.`,
	totalLabel: 'Ukupno',
	pensionLabel: 'Mirovinsko (I. + II. stup)',
	incomeTaxLabel: 'Porez na dohodak',
	totalDeductions: 'Ukupna davanja',
	netSalary: 'Neto plaća',
	author: 'Autor',
	chartGross: 'Bruto plaća',
	chartPercent: 'Postotak (%)',
	chartNet: 'neto',
	chartDiff: 'razlika',
	chartTax: 'porez',
	langSwitch: 'English',
	langSwitchPath: '/salary/en',
}

const en: SalaryTranslations = {
	pageLabel: 'calculator',
	pageTitle: 'Income Tax',
	pageSubtitle: (lawLink) => `Net salary calculation per the <a href="${lawLink}">Croatian Income Tax Act</a> — 2025 version (OG 152/24)`,
	grossSalary: 'Gross salary',
	placeholder: '2000',
	taxRatesLabel: 'Municipality tax rates',
	taxRatesArticle: 'Art. 19a',
	lowerPct: '% lower',
	higherPct: '% higher',
	personalAllowanceLabel: 'Personal allowance',
	coefLabel: 'coef.',
	dependentChildren: 'Dependent children',
	dependentFamily: 'Dependent family members',
	disability03: 'Disability (coef. 0.3)',
	disability10: 'Disability 100% (coef. 1.0)',
	gross: 'Gross',
	net: 'Net',
	lostMonthly: 'lost monthly',
	yearlyNet: 'Yearly net',
	yearlyGross: 'Yearly gross',
	yearlyLoss: 'Yearly loss',
	howCalculated: 'How is it calculated?',
	howCalculatedSub: 'Step-by-step breakdown for the given input.',
	step01Title: 'Pension insurance',
	step01Article: 'Art. 23',
	step01Desc: '20% of gross salary goes to pension insurance — 15% to pillar I and 5% to pillar II.',
	step01Remaining: 'remaining',
	step02Title: 'Personal allowance',
	step02Article: 'Art. 14',
	step02Desc: (amount) => `Tax-exempt portion of salary. Basic allowance: <span class="text-text font-mono">${amount}€</span>.`,
	step02Children: 'Children',
	step02Family: 'Dependent members',
	step02Disability: 'Disability',
	step02Disability100: 'Disability 100%',
	step02TotalCoef: 'Total coef.',
	step02TotalAllowance: (amount) => `Total allowance: <span class="text-text font-mono">${amount}€</span>.`,
	step02SubtractFrom: (remaining, allowance) => `From the previous ${remaining}€ we subtract ${allowance}€ allowance.`,
	step02TaxableBase: 'taxable base',
	step02NoTax: 'No tax',
	step02BelowAllowance: (net) => `income below allowance — net = ${net}€`,
	step03Title: 'Income tax',
	step03Article: 'Art. 19a / Art. 24',
	step03Desc: (lower, threshold, higher) => `Lower rate (${lower}%) up to ${threshold}€, higher rate (${higher}%) above. Rates are set by the municipality (Art. 19a). Surtax was abolished in 2025.`,
	totalLabel: 'Total',
	pensionLabel: 'Pension (pillar I + II)',
	incomeTaxLabel: 'Income tax',
	totalDeductions: 'Total deductions',
	netSalary: 'Net salary',
	author: 'Author',
	chartGross: 'Gross salary',
	chartPercent: 'Percentage (%)',
	chartNet: 'net',
	chartDiff: 'difference',
	chartTax: 'tax',
	langSwitch: 'Hrvatski',
	langSwitchPath: '/salary/hr',
}

export const salaryTranslations: Record<SalaryLang, SalaryTranslations> = { hr, en }
