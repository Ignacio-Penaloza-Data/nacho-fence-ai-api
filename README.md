# Nacho Fence AI API

Backend API powering the AI chat assistant and quote request system for the
[Nacho Fence](https://nachofence.com) website — a fence installation and
repair company.

## What it does

- **`/api/chat`** — Powers a live chat widget on the website. Uses OpenAI's
  Responses API (`gpt-5.6-terra`) with a system prompt describing the
  business's services, so visitors can ask questions about fencing and get
  accurate, on-brand answers.
- **`/api/quote`** — Receives quote request submissions from the website's
  contact form and emails them to the business owner via the
  [Resend](https://resend.com) API.

## Tech stack

- Node.js serverless functions, deployed on [Vercel](https://vercel.com)
- [OpenAI API](https://platform.openai.com) (Responses API, GPT-5.6 Terra)
- [Resend](https://resend.com) for transactional email
- CORS-enabled so the separately-hosted static site can call these endpoints

## Environment variables

This project requires the following, set in Vercel's dashboard
(never committed to the repo):

| Variable          | Purpose                              |
|-------------------|---------------------------------------|
| `OPENAI_API_KEY`  | Authenticates requests to OpenAI      |
| `RESEND_API_KEY`  | Authenticates requests to Resend      |
