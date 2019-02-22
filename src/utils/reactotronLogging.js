import Reactotron, {openInEditor,trackGlobalErrors} from 'reactotron-react-native'

const overWriteConsoleLog = function() {
  console.disableYellowBox = true;

  let logOrig = console.log;
  console.log = (...args) => {
    if (args[0].indexOf('%c') == 0) {
      logOrig.call(global, ...args);
    } else {
      const name = args.shift();
      const data = args;

      if (name.indexOf('@@') > -1) {
        //if (data)
        let str = '';
        args.map(item => str += `${item.toString()}/${typeof(item)}, `);
        // console.tron.log(name, str);
        try {
          console.tron.log(name, data);
        } catch (e) {
          console.debug(name, data, e);
        }
        //else console.tron.log(name);
      // console.tron.display(
      //     {
      //       name: 'console.log',
      //       preview: name,
      //       value: data
      //     }
      //   );          
      } else {
        console.warn(name, ...args)
      }
    }
  }  
}


Reactotron
  .configure({
    name: "React Native Demo",
    host: "localhost"
  })
  .useReactNative({
    // asyncStorage: false, // there are more options to the async storage.
    // networking: { // optionally, you can turn it off with false.
    //   ignoreUrls: /symbolicate/
    // },
    // editor: false, // there are more options to editor
    // errors: { veto: (stackFrame) => false }, // or turn it off with false
    // overlay: false, // just turning off overlay
  })
  .use(openInEditor())
  .use(trackGlobalErrors())
  .connect()
  .clear();

console.tron = Reactotron;
overWriteConsoleLog();