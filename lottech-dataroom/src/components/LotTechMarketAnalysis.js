import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Simple card components to replace the shadcn/ui components
const Card = ({ className, children }) => (
  <div className={`rounded-lg border border-gray-200 shadow-sm ${className || ''}`}>{children}</div>
);

const CardHeader = ({ className, children }) => (
  <div className={`p-4 ${className || ''}`}>{children}</div>
);

const CardTitle = ({ className, children }) => (
  <h3 className={`text-lg font-semibold ${className || ''}`}>{children}</h3>
);

const CardContent = ({ className, children }) => (
  <div className={`p-4 ${className || ''}`}>{children}</div>
);

const LotTechMarketAnalysis = () => {
  // Market data for DMS and CRM in automotive dealership space
  const [marketData] = useState({
    dealershipTechStats: {
      avgTechSolutions: 7, // Average number of tech solutions needed per dealer
      dealerDissatisfaction: 0.80, // 80% of dealers have complaints about current tech
      dmsPenetration: 0.99, // 99% of dealers use a DMS
      crmPenetration: 0.93, // 93% of dealers use a CRM
      upgradeConsideration: {
        ongoing: 0.53, // 53% evaluate on ongoing basis
        decliningValue: 0.25, // 25% evaluate with declining value
        contractExpiration: 0.18, // 18% evaluate when contract expires
        annual: 0.04, // 4% evaluate annually
      },
      improvementDesires: [
        { name: "Integration", value: 30 },
        { name: "Ease of Use", value: 25 },
        { name: "Support", value: 20 },
        { name: "Reporting", value: 15 },
        { name: "Flexibility", value: 10 }
      ],
      selectionFactors: [
        { name: "Vendor Familiarity", value: 35 },
        { name: "Contract Terms", value: 25 },
        { name: "Training/Implementation", value: 20 },
        { name: "Vendor Reputation", value: 15 },
        { name: "Product Features", value: 5 }
      ],
      aiAdoption: {
        viewAsImportant: 0.95, // 95% view AI as important for future success
        veryImportant: 0.43,   // 43% rate AI as "very important"
        important: 0.52,       // 52% rate AI as "important"
        aiEnhancesJobs: 0.72,  // 72% strongly agree AI enhances jobs without replacing
        aiIncreaseRevenue: 1.0, // 100% report revenue increase with AI implementation
        revenueIncreaseLevels: [
          { range: "30%+", percentage: 0.18 },
          { range: "20-30%", percentage: 0.37 },
          { range: "10-20%", percentage: 0.19 },
          { range: "1-10%", percentage: 0.26 }
        ],
        budgetIncrease2025: 0.81, // 81% anticipate AI budget increase in 2025
      }
    },
    usaDMSMarket: {
      currentSize: 10.24, // billion USD in 2024
      cagr: 0.057, // 5.7% CAGR
      years: [2024, 2025, 2026, 2027, 2028, 2029],
      projectedSize2030: 15.09, // billion USD in 2030
    },
    automotiveCRMMarket: {
      currentSize: 8.2, // billion USD in 2024
      cagr: 0.108, // 10.8% CAGR
      years: [2024, 2025, 2026, 2027, 2028, 2029],
      projectedSize2030: 11.9, // billion USD in 2030
    },
    dealershipCount: {
      us: 132100,
    },
    dmsProviders: [
      { name: 'CDK Global', marketShare: 0.31, revenue: 1.05 },
      { name: 'Reynolds & Reynolds', marketShare: 0.28, revenue: 0.95 },
      { name: 'Dealertrack (Cox)', marketShare: 0.19, revenue: 1.12 },
      { name: 'DealerSocket', marketShare: 0.12, revenue: 0.70 },
      { name: 'Auto/Mate', marketShare: 0.06, revenue: 0.65 },
      { name: 'Others', marketShare: 0.04, revenue: 0.60 },
    ],
    dealershipTiers: [
      { name: 'Tier 1 (Large)', percentage: 0.15, avgAnnualRevenue: 75000000, avgAnnualTechSpend: 1500000 },
      { name: 'Tier 2 (Medium)', percentage: 0.35, avgAnnualRevenue: 35000000, avgAnnualTechSpend: 700000 },
      { name: 'Tier 3 (Small)', percentage: 0.50, avgAnnualRevenue: 15000000, avgAnnualTechSpend: 300000 },
    ],
    lotTechTargetMarket: {
      initialYear: 2025,
      targetPenetration: [0.0025, 0.008, 0.02, 0.035, 0.05, 0.065],
    }
  });
  
  // Calculate total dealerships in USA
  const totalDealerships = marketData.dealershipCount.us;
  
  // Generate market size projection data
  const generateMarketProjection = () => {
    const dmsProjection = marketData.usaDMSMarket.years.map((year, index) => {
      const projectedSize = marketData.usaDMSMarket.currentSize * Math.pow(1 + marketData.usaDMSMarket.cagr, index);
      
      return {
        year,
        size: parseFloat(projectedSize.toFixed(2))
      };
    });
    
    const crmProjection = marketData.automotiveCRMMarket.years.map((year, index) => {
      const projectedSize = marketData.automotiveCRMMarket.currentSize * Math.pow(1 + marketData.automotiveCRMMarket.cagr, index);
      
      return {
        year,
        size: parseFloat(projectedSize.toFixed(2))
      };
    });
    
    return {
      dms: dmsProjection,
      crm: crmProjection
    };
  };
  
  const projections = generateMarketProjection();
  
  // Generate combined market projection data for chart
  const combinedProjectionData = marketData.usaDMSMarket.years.map((year, index) => {
    return {
      year,
      DMS: parseFloat(projections.dms[index].size.toFixed(2)),
      CRM: parseFloat(projections.crm[index].size.toFixed(2)),
      Combined: parseFloat((parseFloat(projections.dms[index].size) + parseFloat(projections.crm[index].size)).toFixed(2))
    };
  });
  
  // Calculate LotTech's addressable market
  const calculateAddressableMarket = () => {
    // Calculate dealerships by tier
    const dealershipsByTier = marketData.dealershipTiers.map(tier => {
      return {
        ...tier,
        count: Math.round(tier.percentage * totalDealerships)
      };
    });
    
    // Calculate total tech spend by tier
    const totalTechSpendByTier = dealershipsByTier.map(tier => {
      return {
        ...tier,
        totalTechSpend: tier.count * tier.avgAnnualTechSpend
      };
    });
    
    // Calculate LotTech's revenue potential
    const lotTechRevenuePotential = {
      annualSavings: 0.1, // 10% of tech spend that LotTech can save
      feeRate: 0.08, // 8% average fee on savings
    };
    
    const totalAnnualTechSpend = totalTechSpendByTier.reduce((sum, tier) => sum + tier.totalTechSpend, 0);
    const potentialSavingsGenerated = totalAnnualTechSpend * lotTechRevenuePotential.annualSavings;
    const lotTechPotentialRevenue = potentialSavingsGenerated * lotTechRevenuePotential.feeRate;
    
    return {
      dealershipsByTier,
      totalTechSpendByTier,
      totalAnnualTechSpend,
      potentialSavingsGenerated,
      lotTechPotentialRevenue
    };
  };
  
  const addressableMarket = calculateAddressableMarket();
  
  // Format currency
  const formatCurrency = (value, decimals = 0) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(decimals)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(decimals)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(decimals)}K`;
    } else {
      return `$${value.toFixed(decimals)}`;
    }
  };
  
  // Format large numbers
  const formatNumber = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    } else {
      return value.toString();
    }
  };
  
  // Colors for charts
  const dmsProviderColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#9ca3af'];
  
  return (
    <div className="flex flex-col gap-4 w-full bg-white">
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold text-gray-800">LotTech USA Market Size Analysis</h1>
        <p className="text-gray-600">Automotive Dealership Management Systems & CRM Market</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-center">USA DMS Market (2024)</h3>
            <p className="text-3xl font-bold text-center text-blue-600">{formatCurrency(marketData.usaDMSMarket.currentSize * 1000000000, 1)}</p>
            <p className="text-sm text-center text-gray-600">CAGR: {(marketData.usaDMSMarket.cagr * 100).toFixed(1)}% → {formatCurrency(marketData.usaDMSMarket.projectedSize2030 * 1000000000, 1)} by 2030</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-center">USA Automotive CRM (2024)</h3>
            <p className="text-3xl font-bold text-center text-green-600">{formatCurrency(marketData.automotiveCRMMarket.currentSize * 1000000000, 1)}</p>
            <p className="text-sm text-center text-gray-600">CAGR: {(marketData.automotiveCRMMarket.cagr * 100).toFixed(1)}% → {formatCurrency(marketData.automotiveCRMMarket.projectedSize2030 * 1000000000, 1)} by 2030</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-center">USA Dealerships</h3>
            <p className="text-3xl font-bold text-center text-purple-600">{formatNumber(totalDealerships)}</p>
            <p className="text-sm text-center text-gray-600">New and used car dealerships</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">DMS & CRM Market Growth Projection (USA)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedProjectionData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" />
                <YAxis width={40} tickFormatter={(value) => `$${value}B`} />
                <Tooltip formatter={(value) => [`$${value}B`, '']} />
                <Legend wrapperStyle={{ paddingTop: 10 }} />
                <Line type="monotone" dataKey="DMS" name="DMS Market" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="CRM" name="CRM Market" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Combined" name="Combined Market" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-lg">USA DMS Provider Market Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 5, left: 5, bottom: 0 }}>
                  <Pie
                    data={marketData.dmsProviders}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={45}
                    fill="#8884d8"
                    dataKey="marketShare"
                    nameKey="name"
                    label={false}
                  >
                    {marketData.dmsProviders.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={dmsProviderColors[index % dmsProviderColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => {
                    if (name === "marketShare") {
                      return [`${(value * 100).toFixed(1)}%`, 'Market Share'];
                    }
                    return [value, name];
                  }} />
                  <Legend 
                    layout="vertical" 
                    align="right" 
                    verticalAlign="middle" 
                    wrapperStyle={{ paddingLeft: 20 }}
                    formatter={(value, entry, index) => {
                      const provider = marketData.dmsProviders[index];
                      return `${provider.name}: ${(provider.marketShare * 100).toFixed(0)}%`;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-2">Market Opportunity</h3>
            <p className="text-sm text-gray-700">
              The USA automotive DMS and CRM markets represent a combined {formatCurrency((marketData.usaDMSMarket.currentSize + marketData.automotiveCRMMarket.currentSize) * 1000000000, 1)} opportunity 
              that is projected to reach {formatCurrency((marketData.usaDMSMarket.projectedSize2030 + marketData.automotiveCRMMarket.projectedSize2030) * 1000000000, 1)} by 2030.
            </p>
            
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center justify-center">
                <div className="market-box bg-blue-50 border border-blue-100">
                  <h4 className="font-semibold text-sm">TAM</h4>
                  <p className="text-lg font-bold text-blue-600">
                    {formatCurrency(82100000000, 1)}
                  </p>
                  <p className="text-xs text-gray-500">Total tech spend</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="market-box bg-green-50 border border-green-100">
                  <h4 className="font-semibold text-sm">SAM</h4>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(18400000000, 1)}
                  </p>
                  <p className="text-xs text-gray-500">DMS & CRM market</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="market-box bg-purple-50 border border-purple-100">
                  <h4 className="font-semibold text-sm">SOM</h4>
                  <p className="text-lg font-bold text-purple-600">
                    {formatCurrency(2500000000, 1)}
                  </p>
                  <p className="text-xs text-gray-500">Initial target</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="market-box bg-indigo-50 border border-indigo-100">
                  <h4 className="font-semibold text-sm">Dealerships</h4>
                  <p className="text-lg font-bold text-indigo-600">
                    {formatNumber(totalDealerships)}
                  </p>
                  <p className="text-xs text-gray-500">US market</p>
                </div>
              </div>
            </div>

            
            <p className="text-sm text-gray-700 mt-2">
              According to the 2025 State of AI Adoption survey, <span className="font-bold">95% of dealers believe AI technology 
              will be critical to their success</span>, however only 23% of dealerships have implemented AI in their operations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LotTechMarketAnalysis;