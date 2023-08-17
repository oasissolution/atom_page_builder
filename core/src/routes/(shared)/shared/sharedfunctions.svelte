<script context="module">
	// import { globalEditorPreferencesStore, globalComponentCollectionStore, globalThemeStore } from "../../globals/globalstores.js";
	// import { globalSelectedElementStore } from "../../globals/selectorstores.js";
	import { getComponent } from '../../globals/globalfunctions.js';
	import {
		openOptionsPanel,
		sendDeletedElement,
		refreshEditorData
	} from '../../(shared)/shared/sharedfunctions.js';
	import swal from 'sweetalert';

	// TODO: import all modules dynamically

	import Body from '../../(modules)/modules/body.svelte';
	import Div from '../../(modules)/modules/div.svelte';
	import Text from '../../(modules)/modules/text.svelte';

	/**
	 * Definition and list of all modules in a JSON.
	 * @returns {JSON}
	 *
	 */
	const JsonOfModules = {
		body: Body,
		div: Div,
		text: Text
	};

	/**
	 * Definition and list of all modules in a JSON.
	 * @returns {JSON}
	 *
	 */
	const JsonOfTypes = {
		body: { title: 'Body', data: '' },
		div: { title: 'Container', data: '' },
		text: { title: 'Text', data: 'text' },
		section: { title: 'Section', data: '' }
	};

	/**
	 * Deletes selected component.
	 *
	 * *Located at (shared)/shared/sharedfunctions.svelte
	 */
	export function deleteComponent(globalSelectedElementStore, globalComponentCollectionStore) {
		if (globalSelectedElementStore != undefined && globalComponentCollectionStore != undefined) {
			const comp = getComponent(globalComponentCollectionStore, globalSelectedElementStore.id);
			if (comp != null) {
				if (comp.type != 'body') {
					swal({
						title: 'Delete "' + JsonOfTypes[comp.type].title + '" ?',
						text:
							JsonOfTypes[comp.type].data != '' ? comp.data[JsonOfTypes[comp.type].data] ?? '' : '',
						icon: 'warning',
						buttons: ['No, keep it', 'Yes, DELETE'],
						dangerMode: true
					}).then((willDelete) => {
						if (willDelete) {
							sendDeletedElement(comp.uuid);
							swal('Element deleted', {
								icon: 'success'
							});
						} else {
							swal('Element kept!', { icon: 'info' });
						}
					});
				}
			} else {
				var msg = 'deleteComponent() : Component could not be found!';
				msg +=
					'\nglobalComponentCollectionStore : ' + JSON.stringify(globalComponentCollectionStore);
				msg += '\nglobalSelectedElementStore : ' + JSON.stringify(globalSelectedElementStore);
				msg += '\nglobalSelectedElementStore.id : ' + globalSelectedElementStore.id;
				console.error(msg);
			}
		} else {
			console.error(
				"Either 'globalSelectedElementStore' or 'globalComponentCollectionStore' is undefined!"
			);
		}
	}
</script>
