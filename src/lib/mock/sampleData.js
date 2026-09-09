/**
 * Sample test datasets for development and UI inspection.
 * These represent real-world shapes that the backend returns.
 */

export const SAMPLE_FULL_VIDEO = {
  video: {
    id: 'dQw4w9WgXcQ',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    canonicalUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Mastering Modern React 19: Complete Frontend Architecture & Performance Deep Dive',
    channel: 'DevMastery Academy',
    channelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
    channelUrl: 'https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw',
    publishedAt: '2024-11-15T14:30:00Z',
    duration: 'PT18M42S',
    durationSeconds: 1122,
    category: 'Science & Technology',
    viewCount: 485920,
    likeCount: 29400,
    commentCount: 1420,
    defaultLanguage: 'en',
    hasCaptions: true,
  },
  thumbnail: {
    url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1280&auto=format&fit=crop',
    width: 1280,
    height: 720,
    quality: 'HD (1280x720)',
    availableQualities: [
      { label: 'MaxRes (1080p)', url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1280&auto=format&fit=crop', res: '1280x720' },
      { label: 'High Quality', url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=640&auto=format&fit=crop', res: '640x480' },
      { label: 'Standard', url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=320&auto=format&fit=crop', res: '320x180' },
    ],
  },
  description: `In this comprehensive tutorial, we break down React 19 from the ground up! Learn about the React Compiler, Server Actions, useOptimistic, useActionState, Document Metadata, and Asset Loading.

📌 CHAPTERS:
00:00 - Introduction & React 19 Overview
02:15 - What the React Compiler Changes Forever
05:30 - useActionState & Server Actions Demo
08:45 - Optimistic UI with useOptimistic
12:10 - Asset Loading & SEO Metadata Native Support
15:40 - Migration Strategy for Existing Apps
17:50 - Key Takeaways & Performance Benchmarks

🔗 RESOURCES & LINKS:
• Code Repository: https://github.com/example/react-19-mastery
• Official Docs: https://react.dev/blog/2024/04/25/react-19
• Join our Developer Discord: https://discord.gg/example

Don't forget to like, subscribe, and hit the notification bell for more in-depth web engineering tutorials!

#ReactJS #WebDevelopment #JavaScript #Frontend #CodingTutorial`,
  tags: [
    'react 19',
    'react tutorial',
    'javascript',
    'frontend development',
    'react compiler',
    'useActionState',
    'useOptimistic',
    'web development',
    'software engineering',
    'react js complete course',
    'next js',
    'performance optimization',
    'server actions',
    'coding guide',
    'html css js'
  ],
  transcript: [
    { start: 0, duration: 4.2, text: 'Welcome back everyone! Today we are doing a complete architectural deep dive into React 19.' },
    { start: 4.5, duration: 5.1, text: 'React 19 brings some of the biggest improvements we have seen in years, particularly around compilation and actions.' },
    { start: 10.0, duration: 6.0, text: 'Before we dive into the code editor, let us quickly look at the foundational mental model shifts.' },
    { start: 16.5, duration: 4.8, text: 'First up: the React Compiler. For years we had to write useMemo, useCallback, and React.memo.' },
    { start: 21.5, duration: 5.4, text: 'With the compiler active, the compiler automatically memorizes components and values at build time.' },
    { start: 27.2, duration: 6.2, text: 'Next, let us talk about server actions and form management with the brand new useActionState hook.' },
    { start: 33.8, duration: 5.5, text: 'In older versions of React, you had to manually handle pending states, error states, and optimistic values.' },
    { start: 39.5, duration: 6.0, text: 'Now with useActionState, everything is streamlined into a single declarative pattern.' },
    { start: 46.0, duration: 4.8, text: 'Notice how clean the error handling becomes when we hook this into our server endpoints.' },
    { start: 51.0, duration: 5.8, text: 'Another huge feature is native document metadata support right inside component trees.' },
    { start: 57.0, duration: 6.4, text: 'You no longer need third-party libraries just to manage titles, meta tags, and Open Graph cards.' },
    { start: 64.0, duration: 5.2, text: 'In the next chapter, we will benchmark the exact hydration times before and after migration.' }
  ],
  seo: {
    score: 87,
    label: 'Good Optimization',
    status: 'good',
    categories: {
      title: { score: 92, max: 100, label: 'Excellent' },
      description: { score: 85, max: 100, label: 'Strong' },
      tags: { score: 88, max: 100, label: 'Well targeted' },
      keywords: { score: 82, max: 100, label: 'Good coverage' },
      metadata: { score: 90, max: 100, label: 'Complete' },
    },
    issues: [
      {
        id: 'title-length',
        status: 'passed',
        severity: 'success',
        title: 'Title length is well optimized',
        description: 'Title is 80 characters. It is descriptive, front-loads important keywords ("Mastering Modern React 19"), and avoids truncation on most devices.',
      },
      {
        id: 'title-branding',
        status: 'passed',
        severity: 'success',
        title: 'Clear target audience & keyword intent',
        description: 'Contains primary keyword targets: "React 19", "Frontend Architecture", and "Performance".',
      },
      {
        id: 'desc-timestamps',
        status: 'passed',
        severity: 'success',
        title: 'Video chapters and timestamps included',
        description: 'Structured timestamps allow YouTube to generate key moments in Google Search and the player scrubber.',
      },
      {
        id: 'desc-links',
        status: 'passed',
        severity: 'success',
        title: 'Relevant external links provided',
        description: 'Includes links to documentation and code repository with secure HTTPS protocols.',
      },
      {
        id: 'tags-count',
        status: 'passed',
        severity: 'success',
        title: 'Optimal tag volume & relevance',
        description: '15 focused tags provide broad and specific topical authority without keyword stuffing.',
      },
      {
        id: 'transcript-available',
        status: 'passed',
        severity: 'success',
        title: 'Captions / Transcript available',
        description: 'Closed captions provide searchable text indexation for search engines and accessibility for viewers.',
      },
      {
        id: 'desc-cta',
        status: 'attention',
        severity: 'warning',
        title: 'Description could feature earlier call-to-action',
        description: 'The first 2 lines (above the "Show more" fold) should include your primary link or most crucial resource.',
      },
      {
        id: 'tags-branding',
        status: 'attention',
        severity: 'warning',
        title: 'Channel brand tag could be included',
        description: 'Adding your channel name ("DevMastery") to tags helps YouTube link your video to your channel library.',
      }
    ],
  },
  metadata: {
    videoId: 'dQw4w9WgXcQ',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    canonicalUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    channelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
    channelName: 'DevMastery Academy',
    defaultLanguage: 'English (en)',
    publishedDate: '2024-11-15T14:30:00Z',
    category: 'Science & Technology',
    dimension: '2D (HD 1080p)',
    captionStatus: 'Available (English)',
    licensedContent: true,
  }
};

export const SAMPLE_PARTIAL_VIDEO = {
  video: {
    id: 'k85mFx6SUfc',
    url: 'https://www.youtube.com/watch?v=k85mFx6SUfc',
    canonicalUrl: 'https://www.youtube.com/watch?v=k85mFx6SUfc',
    title: 'Quick CSS Grid Tip: Responsive Columns Without Media Queries',
    channel: 'CSS Quickies',
    channelId: 'UC_demo_partial_9921',
    channelUrl: 'https://www.youtube.com/',
    publishedAt: '2025-01-10T10:00:00Z',
    duration: 'PT1M15S',
    durationSeconds: 75,
    category: 'Education',
    viewCount: 14200,
    likeCount: 940,
    commentCount: 38,
    defaultLanguage: 'en',
    hasCaptions: false,
  },
  thumbnail: {
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1280&auto=format&fit=crop',
    width: 1280,
    height: 720,
    quality: 'HD (1280x720)',
    availableQualities: [
      { label: 'Standard', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=640&auto=format&fit=crop', res: '640x480' }
    ],
  },
  description: 'Quick tip: Use grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) to make a responsive card layout with zero media queries!',
  tags: [], // No tags found for this video (demonstrating partial success empty state)
  transcript: null, // No transcript available
  seo: {
    score: 54,
    label: 'Needs Attention',
    status: 'warning',
    categories: {
      title: { score: 78, max: 100, label: 'Acceptable' },
      description: { score: 40, max: 100, label: 'Too short' },
      tags: { score: 10, max: 100, label: 'Missing' },
      keywords: { score: 55, max: 100, label: 'Basic' },
      metadata: { score: 85, max: 100, label: 'Good' },
    },
    issues: [
      {
        id: 'title-ok',
        status: 'passed',
        severity: 'success',
        title: 'Title is clear and descriptive',
        description: 'Title summarizes the exact tip provided in the video.',
      },
      {
        id: 'tags-missing',
        status: 'problem',
        severity: 'danger',
        title: 'No tags detected',
        description: 'No tags were found for this video. While tags have lower weight than title, relevant tags help catch common search spelling variations.',
      },
      {
        id: 'desc-short',
        status: 'attention',
        severity: 'warning',
        title: 'Description is very brief (138 characters)',
        description: 'Expanding the description with code snippets, links, and context can boost search discoverability.',
      },
      {
        id: 'transcript-unavailable',
        status: 'attention',
        severity: 'warning',
        title: 'No captions or transcript detected',
        description: 'Adding closed captions provides text signals for search engines and improves accessibility.',
      }
    ],
  },
  metadata: {
    videoId: 'k85mFx6SUfc',
    videoUrl: 'https://www.youtube.com/watch?v=k85mFx6SUfc',
    embedUrl: 'https://www.youtube.com/embed/k85mFx6SUfc',
    channelName: 'CSS Quickies',
    defaultLanguage: 'English (en)',
    publishedDate: '2025-01-10T10:00:00Z',
    category: 'Education',
    dimension: '2D',
    captionStatus: 'Unavailable',
  }
};
