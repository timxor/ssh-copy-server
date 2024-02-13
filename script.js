var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'es6-promise/auto';
function copyFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const fileNameInput = document.getElementById("fileName");
        const filePathInput = document.getElementById("filePath");
        const fileName = fileNameInput.value;
        const filePath = filePathInput.value;
        if (!fileName || !filePath) {
            alert("Please enter both file name and path.");
            return;
        }
        try {
            // Make an AJAX request to the server to resolve the file path
            const resolvedPathResponse = yield fetch('/resolveFilePath', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filePath })
            });
            if (!resolvedPathResponse.ok) {
                throw new Error('Failed to resolve file path.');
            }
            const { resolvedPath } = yield resolvedPathResponse.json();
            const downloadLink = document.createElement("a");
            downloadLink.href = resolvedPath;
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
        catch (error) {
            console.error('Error:', error);
            alert('An error occurred while copying the file.');
        }
    });
}
export { copyFile };
