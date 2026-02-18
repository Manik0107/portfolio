export default function ResumePage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <iframe
                src="/resume.pdf"
                className="flex-1 w-full border-none"
                style={{ height: '100vh' }}
                title="Resume"
            />
        </div>
    );
}
