---
title: Exploring MCP Servers — A Hands-On Movie Ticket Booking Project
date: 2025-06-04
tags: [mcp, node.js, ai, backend]
excerpt: I built a movie ticket booking system using Node.js and the Model Context Protocol SDK to get hands-on experience with MCP servers before an upcoming requirement at work.
---

![Movie Ticket Booking with MCP](https://media.licdn.com/dms/image/v2/D5622AQGbIhlQb1Gq1g/feedshare-shrink_800/B56Zc6EgB_H8Ag-/0/1749025948989?e=2147483647&v=beta&t=zeKZtP48_2kThSeInqdWKexuapHUQicwCtKjaUv2FKY)

Recently, I embarked on a project to familiarize myself with the **Model Context Protocol (MCP)**, prompted by an upcoming requirement at my company. To gain practical experience, I developed a simple movie ticket booking system using **Node.js** and the `@modelcontextprotocol/sdk`.

## Project Highlights

- **MCP Server Implementation** — Leveraged the MCP framework to expose functionalities like listing movies, booking tickets, and viewing bookings
- **Interactive Tools** — Created tools that allow users to interact with the system, such as selecting seats and viewing available shows
- **Data Management** — Utilized JSON files to manage data for movies, theaters, users, and bookings, ensuring a lightweight and efficient setup

## Technologies Used

- **Node.js** for server-side scripting
- **JSON files** for data storage and retrieval
- **Zod** for input validation
- **@modelcontextprotocol/sdk** for implementing MCP, facilitating seamless AI integration

## Why MCP?

MCP makes a lot of sense when your platform has valuable contextual data that can enhance LLM interactions. Once LLMs have that context, a simple command can power highly-tailored, contextually-aware results.

The key insight: **let the use cases drive the design of your MCP tools**. Start with the problem being solved. If it can be solved better by adding an MCP integration, go for it. If not, don't.

Most non-production use cases for MCP today include:
- Providing engineering context for debugging and code suggestions
- Operating on git repositories
- Generating documentation
- Scaffolding SDKs

## What I Learned

This project was a deep dive into backend development and AI integration. By utilizing MCP, the system is now equipped to interact with AI models, opening avenues for advanced features like AI-driven recommendations and automated customer support.

The MCP SDK abstracts away a lot of the protocol complexity — you define your tools with schemas (via Zod), implement the handlers, and the SDK takes care of the communication layer between your server and any MCP-compatible client (Claude Desktop, Cursor, etc.).

## What's Next

I'm eager to explore further enhancements:
- Building more complex multi-tool workflows
- Integrating MCP servers into production AI agent pipelines at work
- Combining MCP with LangGraph for stateful agent orchestration
