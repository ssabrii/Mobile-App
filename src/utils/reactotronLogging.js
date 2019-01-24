import Reactotron, { openInEditor } from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

function reactoTronConfig() {
  let reactotronInstance = Reactotron
    .configure({name: "Locktrip - Mobile Market aka Mobile-App", host: 'localhost'})
    .useReactNative({
      // asyncStorage: false, // there are more options to the async storage.
      // networking: { // optionally, you can turn it off with false.
      //   ignoreUrls: /symbolicate/
      // },
      // editor: false, // there are more options to editor
      // errors: { veto: (stackFrame) => true }, // or turn it off with false
      // overlay: false, // just turning off overlay
    })
    .use(reactotronRedux({
      // onRestore: Immutable
    }))
    .use(openInEditor())
    .connect()
    .clear();

    console.tron = Reactotron;
} 
  
function overrideLogs() {
	  setTimeout(() => {
	  
	  	const _this = this;
		
		log = console.log;
		debug = console.debug;
		info = console.info;
		console.log = () => Reactotron.log.apply(_this, arguments)
		console.info = () => Reactotron.display.apply(_this,{name: 'LOG',value:arguments})
		console.debug = () => Reactotron.debug.apply(_this, arguments)

		log('this',this)
		
	  },100)
}

// exports
export default reactoTronConfig;