import React from "react";
import { Card } from "../ui/card";
import ReactQuill from "react-quill";

interface QuillEditorProp {
    value: string;
    onChange: (content: string) => void;
}

export const QuillEditor: React.FC<QuillEditorProp> = ({ value, onChange }) => {

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <Card className="p-4 h-full ">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                className="h-[calc(100%-40px)]"
            />
        </Card>
    );
};