import Reactotron, { openInEditor } from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

function reactoTronConfig() {
  const reactotron = Reactotron
    .configure({
      name: "Locktrip - Mobile Market aka Mobile-App"
    })
    .useReactNative({
      asyncStorage: true, // there are more options to the async storage.
      networking: { // optionally, you can turn it off with false.
        ignoreUrls: /symbolicate/
      },
      editor: true, // there are more options to editor
      errors: { veto: (stackFrame) => true }, // or turn it off with false
      overlay: true, // just turning off overlay
    })
    .use(reactotronRedux())
    .use(openInEditor())
    .connect()
    .clear();

    return reactotron;
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

function debugConfig() {
	
}
  
// Debug Logging Configuration
//overrideLogs() //TODO: An extra that might not be used in the future (Alex K)
export default reactoTronConfig()
