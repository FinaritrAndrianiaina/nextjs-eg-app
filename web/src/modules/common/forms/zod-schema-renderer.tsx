
"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import { JSX, useState } from "react"
import * as z from "zod"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible"

interface SchemaRendererProps {
    schema: z.ZodTypeAny
    name?: string
    isNested?: boolean
}

export function ZodSchemaRenderer({ schema, name, isNested = false }: SchemaRendererProps) {
    const [isOpen, setIsOpen] = useState(!isNested)

    const renderSchemaContent = (schema: z.ZodTypeAny): JSX.Element => {
        if (schema instanceof z.ZodString) {
            return <Badge variant="secondary">string</Badge>
        } else if (schema instanceof z.ZodNumber) {
            return <Badge variant="secondary">number</Badge>
        } else if (schema instanceof z.ZodBoolean) {
            return <Badge variant="secondary">boolean</Badge>
        } else if (schema instanceof z.ZodArray) {
            return (
                <div className="ml-4">
                    <Badge variant="secondary">array</Badge>
                    <ZodSchemaRenderer schema={schema.element} isNested />
                </div>
            )
        } else if (schema instanceof z.ZodObject) {
            return (
                <div className="ml-4">
                    {Object.entries(schema.shape).map(([key, value]) => (
                        <ZodSchemaRenderer key={key} schema={value as z.ZodTypeAny} name={key} isNested />
                    ))}
                </div>
            )
        } else if (schema instanceof z.ZodEnum) {
            return (
                <div>
                    <Badge variant="secondary">enum</Badge>
                    <span className="ml-2">{schema.options.join(" | ")}</span>
                </div>
            )
        } else if (schema instanceof z.ZodUnion) {
            return (
                <div className="ml-4">
                    <Badge variant="secondary">union</Badge>
                    {schema.options.map((option: never, index: number) => (
                        <ZodSchemaRenderer key={index} schema={option} isNested />
                    ))}
                </div>
            )
        } else if (schema instanceof z.ZodOptional) {
            return (
                <div>
                    <Badge variant="outline">optional</Badge>
                    <ZodSchemaRenderer schema={schema.unwrap()} isNested />
                </div>
            )
        } else {
            return <Badge variant="secondary">unknown</Badge>
        }
    }

    const content = renderSchemaContent(schema)

    if (isNested) {
        return (
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="ml-4">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        <span className="ml-2 font-mono">{name}</span>
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 mt-1">{content}</CollapsibleContent>
            </Collapsible>
        )
    }

    return (
        <div className="font-mono">
            {name && <span className="font-bold">{name}: </span>}
            {content}
        </div>
    )
}