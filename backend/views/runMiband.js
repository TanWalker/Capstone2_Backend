
'use strict';

global.TextDecoder = require('util').TextDecoder;

// const bluetooth = require('webbluetooth').bluetooth;
const MiBand = require('../libs/miband');
const bluetooth = navigator.bluetooth;
const log = console.log;

async function scan() {
  try {
    log('Requesting Bluetooth Device...');
    const device = await bluetooth.requestDevice({
      filters: [
        { services: [ MiBand.advertisementService ] }
      ],
      optionalServices: MiBand.optionalServices
    });

    device.addEventListener('gattserverdisconnected', () => {
      log('Device disconnected');
    });

    log('Connecting to the device...');
    const server = await device.gatt.connect();
    log('Connected');

    let miband = new MiBand(server);

    await miband.init();


    let info = {
        time:     await miband.getTime(),
        battery:  await miband.getBatteryInfo(),
        hw_ver:   await miband.getHwRevision(),
        sw_ver:   await miband.getSwRevision(),
        serial:   await miband.getSerial(),
    
    
    }

    console.log(info);
    

  } catch(error) {
    log('Argh!', error);
  }
}

function test() {
    alert('123');
}
document.querySelector('#scanBtn').addEventListener('click', test)
