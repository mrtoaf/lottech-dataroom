import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

const LotTechDealerTechLandscape = () => {
  // Market data for dealer technology landscape
  const [dealerTechData] = useState({
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
        { name: "Product Features", value: 25 },
        { name: "Training/Implementation", value: 20 },
        { name: "Contract Terms", value: 15 },
        { name: "Vendor Reputation", value: 5 }
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
      },
      dataActivation: {
        realTimeInsights: 0.28, // Top challenge: Real-time customer insights (28%)
        predictiveMaintenance: 0.20, // Challenge: Predictive maintenance alerts (20%)
        accessTechnology: 0.18, // Challenge: Access to right technology (18%)
        dataIntegration: 0.18,  // Challenge: Integrating multiple data sources (18%)
        aiHelpingActivation: {
          greatExtent: 0.32,    // 32% say AI helps to a great extent
          moderateExtent: 0.59, // 59% say AI helps to a moderate extent
          slightExtent: 0.09,   // 9% say AI helps to a slight extent
        }
      },
      currentImplementation: [
        { area: "Customer Relationship Management", alreadyUsing: 31, inDeployment: 20, planning2025: 36, noPlans: 13 },
        { area: "Sales and Customer Service", alreadyUsing: 29, inDeployment: 17, planning2025: 39, noPlans: 15 },
        { area: "Fraud Detection", alreadyUsing: 29, inDeployment: 17, planning2025: 39, noPlans: 15 },
        { area: "Predictive Maintenance", alreadyUsing: 26, inDeployment: 24, planning2025: 33, noPlans: 17 },
        { area: "Marketing and Advertising", alreadyUsing: 25, inDeployment: 18, planning2025: 44, noPlans: 13 },
        { area: "Inventory Management", alreadyUsing: 25, inDeployment: 21, planning2025: 36, noPlans: 18 },
        { area: "Lead Generation", alreadyUsing: 25, inDeployment: 17, planning2025: 43, noPlans: 15 },
        { area: "Employee Training", alreadyUsing: 22, inDeployment: 22, planning2025: 40, noPlans: 16 }
      ]
    }
  });
 
  // Colors for charts
  const colorPalette = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#9ca3af'];
 
  // Format percentages
  const formatPercent = (value) => {
    return `${value}%`;
  };
 
  return (
    <div className="flex flex-col gap-6 w-full bg-white">
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">LotTech Dealer Technology Landscape</h1>
        <p className="text-lg text-gray-600">Insights into Dealership Technology Usage and Preferences</p>
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-center">Tech Solutions</h3>
            <p className="text-3xl font-bold text-center text-blue-600">{dealerTechData.dealershipTechStats.avgTechSolutions}</p>
            <p className="text-sm text-center text-gray-600">Avg. solutions per dealership</p>
          </CardContent>
        </Card>
       
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-center">Dealer Dissatisfaction</h3>
            <p className="text-3xl font-bold text-center text-red-600">{(dealerTechData.dealershipTechStats.dealerDissatisfaction * 100)}%</p>
            <p className="text-sm text-center text-gray-600">Have complaints about tech</p>
          </CardContent>
        </Card>
       
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-center">Core System Usage</h3>
            <p className="text-3xl font-bold text-center text-green-600">{(dealerTechData.dealershipTechStats.dmsPenetration * 100)}%</p>
            <p className="text-sm text-center text-gray-600">Of dealers use a DMS system</p>
          </CardContent>
        </Card>
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-lg">Dealer Technology Improvement Desires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dealerTechData.dealershipTechStats.improvementDesires} layout="vertical" margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 35]} tickFormatter={(value) => `${value}%`} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
       
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-lg">Dealer Software Selection Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dealerTechData.dealershipTechStats.selectionFactors} layout="vertical" margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 40]} tickFormatter={(value) => `${value}%`} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Bar dataKey="value" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
     
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Technology Upgrade Consideration Timing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Ongoing Evaluation', value: dealerTechData.dealershipTechStats.upgradeConsideration.ongoing * 100 },
                    { name: 'Declining Value', value: dealerTechData.dealershipTechStats.upgradeConsideration.decliningValue * 100 },
                    { name: 'Contract Expiration', value: dealerTechData.dealershipTechStats.upgradeConsideration.contractExpiration * 100 },
                    { name: 'Annual Review', value: dealerTechData.dealershipTechStats.upgradeConsideration.annual * 100 }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelStyle={{ fontSize: 12 }}
                >
                  {[0, 1, 2, 3].map((index) => (
                    <Cell key={`cell-${index}`} fill={colorPalette[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Remove page break - causing layout issues */}
     
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Current Status of AI Implementation in Dealership Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-90">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={dealerTechData.dealershipTechStats.currentImplementation}
                margin={{ top: 20, right: 10, left: 0, bottom: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={formatPercent} domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis dataKey="area" type="category" width={140} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Legend verticalAlign="bottom" height={40} />
                <Bar dataKey="alreadyUsing" stackId="a" fill="#3b82f6" name="Already Using" />
                <Bar dataKey="inDeployment" stackId="a" fill="#10b981" name="Currently in Deployment" />
                <Bar dataKey="planning2025" stackId="a" fill="#f59e0b" name="Planning to Deploy Within Next Year" />
                <Bar dataKey="noPlans" stackId="a" fill="#9ca3af" name="No Plans to Deploy" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
     
      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-bold mb-3">Dealership Technology Landscape Summary</h3>
          <p className="text-base text-gray-700 leading-relaxed mb-3">
            The average car dealership requires <span className="font-bold text-blue-600">7 different technology solutions</span> to run their business effectively. While 99% of dealers use
            a DMS and 93% use a CRM system, a significant <span className="font-bold text-red-600">80% of dealers are dissatisfied</span> with their current technology solutions.
            This dissatisfaction primarily stems from poor integration, difficulty of use, inadequate support, limited reporting capabilities, and lack of flexibility.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-3">
            When considering technology upgrades, <span className="font-semibold">53% of dealers evaluate their systems on an ongoing basis</span>, while 25% consider upgrades when they experience
            declining value or persistent problems. Dealers prioritize vendor familiarity (35%) and product features (25%) when selecting new software.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            <span className="font-semibold">AI adoption is gaining momentum</span> across dealership operations, with the highest current implementation in Customer Relationship Management (31%),
            Sales and Customer Service (29%), and Fraud Detection (29%). Marketing and Advertising is projected to see the largest deployment of AI in 2025 (44%),
            highlighting the growing recognition of AI's potential in enhancing dealership operations. The data shows a clear trend: while only about a quarter of dealerships have AI fully implemented across their operations today, a significant percentage are planning to deploy AI solutions within the next year, particularly in marketing and lead generation areas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LotTechDealerTechLandscape;