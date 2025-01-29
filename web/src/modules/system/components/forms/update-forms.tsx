"use client";

import { ZodFormRenderer } from "@/modules/common/forms/zod-form-renderer";
import { updatePreferencesSystemInfoSchema } from "../../types";

export default function UpdateSystemForm({ defaultValue }: any) {
    return (
        <>
            <div>
                <ZodFormRenderer
                    title="Update System Info"
                    defaultValues={defaultValue}
                    description="System information enable or disable some features"
                    className={"grid grid-cols-2 grid-rows-2 gap-2 "}
                    schema={updatePreferencesSystemInfoSchema}
                    onSubmit={(data) => console.log(data)}
                />

            </div>
        </>
    );
}