// Image encoding method provided by Gemini
const objectUrlToBase64 = (objectUrl) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; 
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png'); 
            resolve(dataUrl);
        };
        img.onerror = (error) => reject(error);
        img.src = objectUrl;
    });
};
// End of gemini code

const saveTierListToJSONFile = async (tiers, tierOrder, tiersData, itemsData, tierCount) => {
    let encodedItemsData = JSON.parse(JSON.stringify(itemsData));
    const keys = Object.keys(encodedItemsData);
    // Promise logic done with the help of Gemini
    await Promise.all(keys.map(async (key) => {
        const currentUrl = encodedItemsData[key].imageUrl;
        
        if (currentUrl && currentUrl.startsWith('blob:')) {
            try {
                encodedItemsData[key].imageUrl = await objectUrlToBase64(currentUrl);
            } catch (error) {
                console.error(`Failed to encode image for ${key}:`, error);
            }
        }
    }));
    // End of Gemini code

    let jsonData = {
        tiers: tiers,
        tierOrder: tierOrder,
        tiersData: tiersData,
        itemsData: encodedItemsData,
        tierCount: tierCount
    }

    const fileData = JSON.stringify(jsonData, null, 2); 
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `tierlist_save_${Date.now()}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

const loadTierListFromJSONFIle = async (file, setTiers, setTierOrder, setTiersData, setItemsData, setTierCount) => {
    let fileText;

    if (file instanceof File) {
        fileText = await file.text();
    }

    let fileObject;
    try {
        fileObject = JSON.parse(fileText);
    } catch (error) {
        console.error("File uploaded for load tierlist is not valid JSON", error);
        alert("The uploaded file is not a valid Tierlist save file");
        return;
    }

    setTiers(fileObject?.tiers);
    setTierOrder(fileObject?.tierOrder);
    setTiersData(fileObject?.tiersData);
    setItemsData(fileObject?.itemsData);
    setTierCount(fileObject?.tierCount);
}

exports.saveTierListToJSONFile = saveTierListToJSONFile;
exports.loadTierListFromJSONFIle = loadTierListFromJSONFIle;