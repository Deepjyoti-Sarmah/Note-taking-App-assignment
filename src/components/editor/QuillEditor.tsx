import React, { useRef, useState, useEffect } from "react";
import { Card } from "../ui/card";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProp {
    value: string;
    onChange: (content: string) => void;
    readOnly?: boolean;
    className?: string;
}

export const QuillEditor: React.FC<QuillEditorProp> = ({
    value,
    onChange,
    readOnly = false,
    className
}) => {
    const quillRef = useRef<ReactQuill | null>(null);
    const [contentLength, setContentLength] = useState<number>(0);
    const [range, setRange] = useState<any>();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleTextChange = (content: string, _delta: any, _source: string, editor: any) => {
        onChange(content);
        setContentLength(editor.getLength());
    };

    const handleSelectionChange = (range: any) => {
        setRange(range);
    };

    const modules = {
        toolbar: isMobile ? [
            ['bold', 'italic'],
            [{ 'list': 'bullet' }],
            ['link'],
        ] : [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <Card className={`flex flex-col bg-white h-full ${className}`}>
            <div className="flex-1 flex flex-col overflow-hidden">
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={value}
                    onChange={handleTextChange}
                    onChangeSelection={handleSelectionChange}
                    modules={modules}
                    readOnly={readOnly}
                    placeholder="Start writing..."
                    className="flex-1"
                    style={{
                        height: 'calc(100% - 42px)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                />
            </div>
            <div className="flex justify-between p-2 text-xs text-zinc-500 border-t">
                <span>Length: {contentLength}</span>
                <span>Range: {range ? `${range.index}, ${range.length}` : "None"}</span>
            </div>
        </Card>
    );
};