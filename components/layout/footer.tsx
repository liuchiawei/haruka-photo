export default function Footer() {
    return (
        <footer className="py-4">
            <div className="container mx-auto">
                <p className="text-sm text-center">
                    &copy; {new Date().getFullYear()} Haruka Kikuchi.
                    <br />
                    All rights reserved.
                </p>
            </div>
        </footer>
    );
}