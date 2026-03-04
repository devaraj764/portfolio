---
title: Building a RAG Server with LangChain, LangGraph & Qdrant
date: 2025-08-08
tags: [rag, langchain, langgraph, qdrant, ai]
excerpt: A technical walkthrough of building a RAG server with dynamic source selection — choosing between vector embeddings and live web data using LangGraph's state machine approach.
---

![Building a RAG Server](https://media.licdn.com/dms/image/v2/D4E12AQFsKbvHgu6fKw/article-cover_image-shrink_720_1280/B4EZiK3mY7GcAI-/0/1754676493365?e=2147483647&v=beta&t=-Qq4BKvNKMY2Q4whVEd75JNKXbSyHFSpQKD52MkdbYc)

Over the past few weeks, I embarked on an exciting journey to build a **Retrieval-Augmented Generation (RAG)** server that leverages the power of **LangChain**, **LangGraph**, and **Qdrant**. This post is both a technical reflection and a personal milestone in my exploration of agentic AI systems.

## The Vision: Intelligent Search that Knows Where to Look

I wanted to create a system that could dynamically decide **where to search** — should it look into **stored embeddings from my vector database (Qdrant)**, or should it query **live information from the internet**, like Wikipedia?

The goal: a **smart, reactive agent** capable of choosing between multiple sources based on user queries. And not just static data — I wanted it to be able to **ingest new content on demand**.

## Tools I Used

- **[LangChain](https://www.langchain.com/)** — for its modular abstraction of LLM apps
- **[LangGraph](https://www.langchain.com/langgraph)** — to create a decision-making graph of actions for the agent
- **[Qdrant](https://python.langchain.com/docs/integrations/vectorstores/qdrant/)** — a blazing-fast vector database for storing document embeddings
- **OpenAI / LLMs** — for reasoning, embeddings, and query answering
- **Wikipedia** — as my unstructured knowledge source

## What I Built

### 1. RAG Agent with Dynamic Source Selection

Using **LangGraph**, I built an agent that can:

- Decide **whether to query Qdrant** or **scrape Wikipedia** based on the user's question
- Retrieve relevant embeddings from Qdrant using LangChain's retriever wrapper
- Ask Wikipedia only when the context is likely out-of-domain or not stored locally

LangGraph was a game changer — it allowed me to **model the logic flow declaratively**, using state and condition branches, rather than hard-coding the agent's reasoning.

### 2. Wikipedia Website Loader + Embedding Pipeline

I built a **custom website loader** that scrapes the pageContent from any Wikipedia URL, splits it into manageable chunks, and stores it as **vector embeddings in Qdrant**.

This allowed me to:

- Dynamically index new topics of interest
- Improve response quality over time as my vector store grew
- Enable hybrid search: **retrieval from embeddings + LLM generation**

![RAG Agent Architecture](https://media.licdn.com/dms/image/v2/D4E12AQHUmJNWcMkxOA/article-inline_image-shrink_400_744/B4EZiK1lTqGYAg-/0/1754675961124?e=2147483647&v=beta&t=example)

## Example Workflow

1. **User asks**: *"What is the role of mitochondria in human cells?"*
2. The agent first **checks Qdrant**: Are there relevant vectors?
3. If not enough context, it **scrapes the corresponding Wikipedia page**, stores the content in Qdrant, and continues the answer generation
4. The **LLM** uses the combined context to generate a response

## What I Learned

- **LangGraph** lets you model agent behavior as a **state machine**, making it more understandable and scalable than imperative control flows
- Managing document loading and embedding pipelines is crucial — you can't just rely on live search
- **Deciding *when* to query what** is as important as *how* — especially when combining static knowledge with live data

## What's Next?

- Integrate **streaming answers** with WebSockets
- Improve **ranking and reranking** of documents retrieved
- Experiment with **multi-modal embeddings** (text + images)
- Add support for **user-uploaded documents**

## Final Thoughts

Agentic AI is moving fast. Tools like LangChain and LangGraph have opened up new possibilities for **building decision-making agents** that go beyond simple retrieval or question answering.

This RAG server is just a step in my journey, but it's been a thrilling one. If you're working on something similar, I'd love to connect, share notes, and grow together.
