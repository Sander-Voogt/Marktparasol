"use client"

import { Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Column, Columns } from "./Columns"
import DOMPurify from "dompurify"

import React, { useEffect, useState } from "react"

type Props = {
  content?: string
}

export function ProductDescription({ content }: Props) {
  const [html, setHtml] = useState<string>("")

  useEffect(() => {
    if (!content) return

    try {
      const json = JSON.parse(content)

      const editor = new Editor({
        extensions: [StarterKit, Columns, Column],
        content: json,
      })

      setHtml(DOMPurify.sanitize(editor.getHTML()))
    } catch (err) {
      setHtml(DOMPurify.sanitize(content))
    }
  }, [content])

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
