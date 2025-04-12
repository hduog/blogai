export type BlogInput = {
  title: string;
  shortDescription: string;
  introduction: string;
  body: string;
  conclusion: string;
  referenceLink?: string;
  imageUrls: string[];
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  mainColor: string; // ví dụ: #1d4ed8
  language: "English" | "Vietnamese";
};

export function createBlogPrompt(input: BlogInput): string {
  const lines = [
    `You are a skilled HTML developer and blog writer with a passion for clean, well-structured content.`,
    `Your task is to craft an engaging, SEO-optimized blog post in full HTML format.`,
    `The blog must meet the following criteria:`,
    `- Fluent, compelling writing in ${input.language}, with storytelling that flows naturally and engages readers emotionally and intellectually.`,
    `- Must include a rewritten, SEO-optimized <h1> title based on the provided title idea.`,
    `- Body content should be based on the provided idea but fully rewritten and expanded, with over 2000 characters (minimum).`,
    `- Conclusion should be rewritten and polished, at least 500 characters, offering summary and takeaway.`,
    `- Proper use of semantic HTML elements (<h1>, <h2>, <p>, <img>, etc.).`,
    `- Styled with Tailwind CSS (via CDN).`,
    `- Fully responsive and optimized for all screen sizes.`,
    `- Follows SEO best practices (header tags, keyword usage, internal/external links, meta structure, etc.).`,
    `- Output a valid, complete HTML document — but only return the <body> section in your response.`,
    `- Reflect your own writing creativity; do not copy or depend entirely on the layout template.`,
    `- Use the provided layout as inspiration, not as a hard structure. Write naturally and adapt based on content.`,
    `- Ensure consistent vertical spacing between sections for visual clarity and avoid crowding.`,
    `- Use soft, lighter shades for regular paragraph text to improve visual balance and harmony.`,
    ``,
    `<input>`,
    `- Title: ${input.title}`,
    `- Main Color: ${input.mainColor}`,
    input.shortDescription
      ? `- Short Description: ${input.shortDescription}`
      : ``,
    input.introduction ? `- Introduction: ${input.introduction}` : ``,
    input.body ? `- Body: ${input.body}` : ``,
    input.conclusion ? `- Conclusion: ${input.conclusion}` : ``,
    input.referenceLink ? `- Reference Link: ${input.referenceLink}` : ``,
    input.imageUrls?.filter(Boolean).length
      ? `- Image URLs: ${input.imageUrls.join(", ")}`
      : ``,
    Object.values(input.socialLinks || {}).some(Boolean)
      ? `- Social Links: ${JSON.stringify(input.socialLinks)}`
      : ``,
    `</input>`,
    ``,
    `Instructions:`,
    `1. Rewrite and improve the title for clarity, SEO, and engagement.`,
    `2. Write a natural, attention-grabbing introduction based on the input.`,
    `3. Rewrite and expand the Body idea into a fully developed article of at least 9999999999999 characters. Use the input as a rough guide, not final content.`,
    `   - Divide into sections using <h2>, <h3> headings.`,
    `   - Expand with real examples, comparisons, advice, or storytelling.`,
    `   - Each section should have rich, thoughtful paragraphs.`,
    `   - Ensure even spacing between paragraphs and sections using consistent margin classes (e.g., 'my-6', 'space-y-6').`,
    `4. Rewrite the conclusion to summarize the topic effectively, offer insights or reflections, and meet the 99999999999-character minimum.`,
    `5. Style all headings with Tailwind CSS and apply the main color (${input.mainColor}).`,
    `6. Style body text in a soft gray (e.g., text-gray-600) for readability and visual harmony.`,
    `7. Insert each image URL as <img> with alt text, styled using Tailwind: "my-6 rounded shadow-md w-full max-w-screen-md mx-auto".`,
    `8. If a reference link is provided, include it as a contextual hyperlink within the content.`,
    `9. If social links are provided, include a "Follow Me" section styled with Tailwind.`,
    `10. Conclude the post with a question that encourages reader interaction.`,
    `11. Use <b>, <i>, and <u> to emphasize key ideas when appropriate — but sparingly.`,
    ``,
    `Use the following HTML layout as inspiration — not as a strict template:`,
    ``,
    `<body class="bg-white font-sans leading-relaxed text-gray-800">`,
    `  <main class="mx-auto max-w-3xl px-4 py-12 md:px-6 lg:px-8 space-y-12">`,
    `    <!-- Header -->`,
    `    <header class="text-center space-y-4">`,
    `      <h1 class="text-4xl font-bold tracking-tight" style="color: ${input.mainColor}">`,
    `        {{title}}`,
    `      </h1>`,
    `      <p class="text-gray-500 text-base md:text-lg max-w-xl mx-auto">`,
    `        {{shortDescription}}`,
    `      </p>`,
    `    </header>`,
    `    <!-- Main Image -->`,
    `    <div class="text-center">`,
    `      <img src="{{imageUrl}}" alt="{{imageAlt}}" class="mx-auto w-full max-w-3xl rounded shadow-md my-6" />`,
    `      <p class="mt-2 text-sm text-gray-500 italic">{{imageCaption}}</p>`,
    `    </div>`,
    `    <!-- Article Content -->`,
    `    <article class="space-y-10 text-base text-gray-600 md:text-lg">`,
    `      <section class="space-y-6">`,
    `        <h2 class="text-2xl font-semibold" style="color: ${input.mainColor}">{{introductionTitle}}</h2>`,
    `        <p>{{introductionParagraph1}}</p>`,
    `        <p>{{introductionParagraph2}}</p>`,
    `      </section>`,
    `      {{#each sections}}`,
    `      <section class="space-y-4">`,
    `        <h3 class="text-xl font-semibold" style="color: ${input.mainColor}">{{this.heading}}</h3>`,
    `        <p>{{this.content}}</p>`,
    `        {{#if this.extraParagraph}}`,
    `        <p>{{this.extraParagraph}}</p>`,
    `        {{/if}}`,
    `      </section>`,
    `      {{/each}}`,
    `      {{#if referenceLink}}`,
    `      <section class="pt-10 border-t space-y-4">`,
    `        <h3 class="text-xl font-semibold text-gray-700">Reference</h3>`,
    `        <p>For more insights, visit <a href="{{referenceLink}}" target="_blank" class="text-blue-600 hover:underline font-medium">this trusted source</a>.</p>`,
    `      </section>`,
    `      {{/if}}`,
    `      {{#if socialLinks}}`,
    `      <section class="pt-10 border-t space-y-4">`,
    `        <h3 class="text-xl font-semibold text-gray-700">Follow Me</h3>`,
    `        <p>Stay connected for more updates:</p>`,
    `        <div class="flex space-x-4">`,
    `          {{#if socialLinks.facebook}}<a href="{{socialLinks.facebook}}" target="_blank" class="text-blue-700 hover:underline">Facebook</a>{{/if}}`,
    `          {{#if socialLinks.twitter}}<a href="{{socialLinks.twitter}}" target="_blank" class="text-blue-500 hover:underline">Twitter</a>{{/if}}`,
    `          {{#if socialLinks.email}}<a href="mailto:{{socialLinks.email}}" class="text-gray-700 hover:underline">Email</a>{{/if}}`,
    `        </div>`,
    `      </section>`,
    `      {{/if}}`,
    `    </article>`,
    `  </main>`,
    `</body>`,
  ];

  return lines.filter(Boolean).join("\n").trim();
}

export const blogInputExample: BlogInput = {
  title: "Bí quyết tăng năng suất làm việc mỗi ngày",
  shortDescription:
    "Khám phá những phương pháp đơn giản nhưng hiệu quả giúp bạn làm việc năng suất hơn.",
  introduction:
    "Trong thế giới hiện đại đầy bận rộn, việc duy trì năng suất làm việc cao là một thách thức. Bài viết này sẽ giới thiệu một số cách để cải thiện hiệu quả làm việc hàng ngày.",
  body: `
## 1. Lập kế hoạch cụ thể
Bắt đầu ngày mới bằng cách viết ra những việc cần làm sẽ giúp bạn có định hướng rõ ràng.

## 2. Áp dụng kỹ thuật Pomodoro
Làm việc theo chu kỳ 25 phút tập trung và nghỉ 5 phút sẽ giúp bạn tránh mệt mỏi và duy trì sự tập trung.

## 3. Hạn chế đa nhiệm
Tập trung vào một việc tại một thời điểm giúp tăng chất lượng và tốc độ hoàn thành công việc.

## 4. Nghỉ ngơi hợp lý
Nghỉ ngắn giữa các phiên làm việc giúp tái tạo năng lượng và tăng hiệu suất.

## 5. Sử dụng công cụ hỗ trợ
Các ứng dụng như Todoist, Notion hay Google Calendar có thể giúp bạn quản lý công việc tốt hơn.
  `,
  conclusion:
    "Tăng năng suất không phải là làm nhiều hơn, mà là làm thông minh hơn. Áp dụng những phương pháp trên một cách linh hoạt sẽ giúp bạn cải thiện hiệu quả làm việc mỗi ngày.",
  referenceLink: "https://example.com/nang-suat-lam-viec",
  imageUrls: [
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0",
  ],
  socialLinks: {
    facebook: "https://facebook.com/example",
    twitter: "https://twitter.com/example",
    instagram: "https://instagram.com/example",
    linkedin: "https://linkedin.com/in/example",
  },
  mainColor: "#1d4ed8",
  language: "Vietnamese",
};
