import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ProposalListTablePanel } from '../components/ProposalListTablePanel';

const meta = {
  component: ProposalListTablePanel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
        width: '100%',
        height: '400px',
        position: 'relative',
      }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProposalListTablePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fieldNames: {
      organization_name: 'Organization Name',
      organization_tax_id: 'Organization Tax ID',
      organization_city: 'Organization City',
      organization_state_province: 'Organization State/Province',
      organization_country: 'Organization Country',
      organization_website: 'Organization Website',
      organization_mission_statement: 'Organization Mission Statement',
      organization_start_date: 'Organization Start Date',
      organization_operating_budget: 'Organization Operating Budget',
      proposal_name: 'Proposal Name',
      proposal_summary: 'Proposal Summary',
      proposal_amount_requested: 'Proposal Amount Requested',
      proposal_budget: 'Proposal Budget',
      proposal_fiscal_sponsor_name: 'Proposal Fiscal Sponsor Name',
      proposal_start_date: 'Proposal Start Date',
      proposal_end_date: 'Proposal End Date',
      proposal_location_of_work: 'Proposal Location of Work',
    },
    proposals: [
      {
        id: '1',
        values: {
          organization_tax_id: ['12-3456789'],
          organization_name: ['Acme Corp'],
          organization_city: ['Los Angeles'],
          organization_state_province: ['CA'],
          organization_country: ['USA'],
          organization_website: ['www.example.com'],
          organization_mission_statement: ['To create innovative solutions that make the world a better place.'],
          organization_start_date: ['2005-03-15'],
          organization_operating_budget: ['$5,000,000'],
          proposal_name: ['Make Things Better'],
          proposal_summary: ['Our proposal aims to improve access to clean water in underprivileged communities through the development of a low-cost water filtration system.'],
          proposal_amount_requested: ['$50,000'],
          proposal_budget: ['$50,000'],
          proposal_fiscal_sponsor_name: ['The Charity Foundation'],
          proposal_start_date: ['2022-06-01'],
          proposal_end_date: ['2023-05-31'],
          proposal_location_of_work: ['Rural areas in California, Nevada, and Arizona'],
        },
      },
      {
        id: '2',
        values: {
          organization_tax_id: ['98-7654321'],
          organization_name: ['XYZ Inc.'],
          organization_city: ['New York City'],
          organization_state_province: ['NY'],
          organization_country: ['USA'],
          organization_website: ['www.example.com'],
          organization_mission_statement: ['To build a better world through technology.'],
          organization_start_date: ['2010-01-01'],
          organization_operating_budget: ['$10,000,000'],
          proposal_name: ['Improve The World'],
          proposal_summary: ['Our proposal aims to develop a new voting technology that will increase voter participation and improve election security.'],
          proposal_amount_requested: ['$100,000'],
          proposal_budget: ['$200,000'],
          proposal_fiscal_sponsor_name: ['The Advocacy Fund'],
          proposal_start_date: ['2023-01-01'],
          proposal_end_date: ['2023-12-31'],
          proposal_location_of_work: ['Nationwide'],
        },
      },
      {
        id: '3',
        values: {
          organization_tax_id: ['23-4567890'],
          organization_name: ['Helping Hands'],
          organization_city: ['New York'],
          organization_state_province: ['NY'],
          organization_country: ['USA'],
          organization_website: ['www.example.org'],
          organization_mission_statement: ['To alleviate poverty and provide assistance to those in need.'],
          organization_start_date: ['2000-05-01'],
          organization_operating_budget: ['$15,000,000'],
          proposal_name: ['Food for All'],
          proposal_summary: ['Our proposal aims to establish a community kitchen to provide free meals to homeless individuals in the city.'],
          proposal_amount_requested: ['$75,000'],
          proposal_budget: ['$100,000'],
          proposal_fiscal_sponsor_name: ['The Hunger Relief Fund'],
          proposal_start_date: ['2023-10-01'],
          proposal_end_date: ['2024-09-30'],
          proposal_location_of_work: ['New York City'],
        },
      },

      {
        id: '4',
        values: {
          organization_tax_id: ['34-5678901'],
          organization_name: ['Creative Minds'],
          organization_city: ['San Francisco'],
          organization_state_province: ['CA'],
          organization_country: ['USA'],
          organization_website: ['www.example.org'],
          organization_mission_statement: ['To promote creativity and innovation through education and the arts.'],
          organization_start_date: ['2015-02-01'],
          organization_operating_budget: ['$2,000,000'],
          proposal_name: ['Art for All'],
          proposal_summary: ['Our proposal aims to provide art classes and workshops to underserved communities in the city.'],
          proposal_amount_requested: ['$50,000'],
          proposal_budget: ['$75,000'],
          proposal_fiscal_sponsor_name: ['The Art Education Foundation'],
          proposal_start_date: ['2023-09-01'],
          proposal_end_date: ['2024-08-31'],
          proposal_location_of_work: ['San Francisco'],
        },
      },
    ],
    onSearch: () => {},
  },
};
