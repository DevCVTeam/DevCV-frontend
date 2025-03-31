import axios from 'axios';
import { NextResponse } from 'next/server';

// 원티드 API URL (실제 API URL로 대체 필요)
const WANTED_API_URL = 'https://www.wanted.co.kr/api/v4/jobs';
// 사람인 API URL (실제 API URL로 대체 필요)
const SARAMIN_API_URL = 'https://www.saramin.co.kr/zf_user/jobs/api/get-list';

async function getWantedJobs() {
  try {
    const response = await axios.get(WANTED_API_URL, {
      params: {
        job_sort: 'job.latest_order',
        locations: 'all',
        years: '0',
        limit: 20
      }
    });
    return response.data.data.map((job: any) => ({
      id: job.id,
      source: 'wanted',
      title: job.position,
      company: job.company.name,
      location: job.address.location,
      salary: job.salary,
      imageUrl: job.company.logo_url,
      url: `https://www.wanted.co.kr/wd/${job.id}`
    }));
  } catch (error) {
    console.error('Failed to fetch Wanted jobs:', error);
    return [];
  }
}

async function getSaraminJobs() {
  try {
    const response = await axios.get(SARAMIN_API_URL, {
      params: {
        keywords: '개발자',
        sort: 'pd',
        count: 20
      }
    });
    return response.data.jobs.map((job: any) => ({
      id: job.id,
      source: 'saramin',
      title: job.position,
      company: job.company.name,
      location: job.location,
      salary: job.salary || '면접 후 결정',
      imageUrl: job.company.logo_url,
      url: job.url
    }));
  } catch (error) {
    console.error('Failed to fetch Saramin jobs:', error);
    return [];
  }
}

export async function GET() {
  try {
    const [wantedJobs, saraminJobs] = await Promise.all([
      getWantedJobs(),
      getSaraminJobs()
    ]);

    const allJobs = [...wantedJobs, ...saraminJobs];

    return NextResponse.json({ jobs: allJobs });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
