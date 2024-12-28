import { NextResponse } from 'next/server';

// Dữ liệu mẫu khóa học
const courses = [
  { id: 1, title: 'React Basics', description: 'Learn React from scratch' },
  { id: 2, title: 'Next.js Advanced', description: 'Master Next.js features' },
];

// API lấy danh sách khóa học
export async function GET() {
  return NextResponse.json(courses);
}
