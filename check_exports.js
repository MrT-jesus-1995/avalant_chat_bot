// รันไฟล์นี้ในเครื่องเพื่อดู export paths จริงๆ
const fs = require('fs');

function checkExports(pkgName) {
    try {
        const pkg = JSON.parse(fs.readFileSync(`./node_modules/${pkgName}/package.json`, 'utf-8'));
        const keys = Object.keys(pkg.exports || {});
        const chainKeys = keys.filter(k => k.includes('chain') || k.includes('retriev') || k.includes('stuff') || k.includes('combine'));
        console.log(`\n📦 ${pkgName} — chain-related exports:`);
        chainKeys.forEach(k => console.log('  ', k));
        if (chainKeys.length === 0) {
            console.log('   (none matching) — total exports:', keys.length);
            console.log('   First 20:', keys.slice(0, 20));
        }
    } catch(e) {
        console.log(`❌ ${pkgName}: ${e.message}`);
    }
}

checkExports('langchain');
checkExports('@langchain/core');
checkExports('@langchain/community');