import {
	createCategoryAPI,
	createSubCategoryAPI,
	deleteCategoryAPI,
	deleteSubCategoryAPI,
	getCategoryAPI,
	updateCategoryAPI,
	updateSubCategoryAPI
} from '~~/api/category'

import type {
	Category,
	CreateCategoryBody,
	CreateSubCategoryBody,
	SubCategory
} from '~~/api/category'
import AdminCategorySelect from '~/components/admin/category-select.vue'

export const useAdminArticleCategory = () => {
	const name = ref('')
	const nameEn = ref('')

	const keyword = ref('')
	const description = ref('')

	const selectedCategoryId = ref('')

	const categorySelect = ref<null | InstanceType<typeof AdminCategorySelect>>(null)

	const isEditing = ref(false)

	const mainCategories = ref<Category[]>([])
	const subCategories = ref<SubCategory[]>([])

	const allCategories = computed<(Category | SubCategory)[]>(() => {
		const combined: (Category | SubCategory)[] = [...mainCategories.value]

		for (const item of mainCategories.value) {
			combined.push(...item.post__subcategories)
		}

		return combined
	})

	const editingCategory = ref<Category | SubCategory>()
	const pendingDeleteCategory = ref<Category | SubCategory>()

	const getParentCategory = (category: Category | SubCategory) => {
		if ((category as SubCategory).post__categories_id) {
			const parentCategory = mainCategories.value.find(
				({ id }) => id === (category as SubCategory).post__categories_id
			)

			if (parentCategory) return parentCategory.name_en
		}

		return 'None'
	}

	// #region TOAST
	const {
		isError,
		isPending,
		isSucceed,
		toastErrorMessage,
		toastPendingMessage,
		toastSuccessMessage,
		timeOuts,
		toastAfterFetch,
		toastShouldHide,
		toast
	} = useToast()
	// #endregion TOAST

	const onFormReset = () => {
		name.value = ''
		nameEn.value = ''

		categorySelect.value?.forceChangeSelectedValueFromParent()
		isEditing.value = false
	}

	const updateCategory = async () => {
		// editingCategory is a main category
		if (selectedCategoryId.value === '') {
			const payload: CreateCategoryBody = {
				name: editingCategory.value?.name === name.value ? undefined : name.value,
				name_en: editingCategory.value?.name_en === nameEn.value ? undefined : nameEn.value
			}

			if (editingCategory.value) {
				toast('pending', 'Updating category')

				const res = await updateCategoryAPI(editingCategory.value.id, payload)
				toastAfterFetch(res)
				toastShouldHide('pending')

				if (res.success) {
					isEditing.value = false

					const { success, data } = await getCategoryAPI()
					if (success && data) {
						mainCategories.value = data
						onFormReset()
					}
				}
			}
		} else {
			// editingCategory is a sub-category

			const payload: CreateSubCategoryBody = {
				name: editingCategory.value?.name === name.value ? undefined : name.value,
				name_en: editingCategory.value?.name_en === nameEn.value ? undefined : nameEn.value,
				post__categories_id: Number(selectedCategoryId.value)
			}

			if (editingCategory.value) {
				toast('pending', 'Updating sub-category')

				const res = await updateSubCategoryAPI(editingCategory.value.id, payload)
				toastAfterFetch(res)
				toastShouldHide('pending')

				if (res.success) {
					isEditing.value = false

					const { success, data } = await getCategoryAPI()
					if (success && data) {
						mainCategories.value = data
						onFormReset()
					}
				}
			}
		}
	}

	const deleteCategory = async () => {
		if (pendingDeleteCategory.value) {
			// if it is a sub category
			if ((pendingDeleteCategory.value as SubCategory).post__categories_id) {
				toast('pending', 'Deleting sub-category')

				const res = await deleteSubCategoryAPI(pendingDeleteCategory.value.id)
				toastAfterFetch(res)
				toastShouldHide('pending')

				if (res.success) {
					const { success, data } = await getCategoryAPI()
					if (success && data) {
						mainCategories.value = data
					}
				}
			} else {
				toast('pending', 'Deleting category')

				const res = await deleteCategoryAPI(pendingDeleteCategory.value.id)
				toastAfterFetch(res)
				toastShouldHide('pending')

				if (res.success) {
					const { success, data } = await getCategoryAPI()
					if (success && data) {
						mainCategories.value = data
					}
				}
			}
		}
	}

	const publish = async () => {
		if (selectedCategoryId.value === '') {
			const payload: CreateCategoryBody = {
				name: name.value,
				name_en: nameEn.value
			}

			toast('pending', 'Creating category')

			const res = await createCategoryAPI(payload)
			toastAfterFetch(res)
			toastShouldHide('pending')

			if (res.success) {
				const { success, data } = await getCategoryAPI()
				if (success && data) {
					mainCategories.value = data
					onFormReset()
				}
			}
		} else {
			const payload: CreateSubCategoryBody = {
				name: name.value,
				name_en: nameEn.value,
				post__categories_id: Number(selectedCategoryId.value)
			}

			toast('pending', 'Creating sub-category')

			const res = await createSubCategoryAPI(payload)
			toastAfterFetch(res)
			toastShouldHide('pending')

			if (res.success) {
				const { success, data } = await getCategoryAPI()
				if (success && data) {
					mainCategories.value = data
					onFormReset()
				}
			}
		}
	}

	return {
		name,
		nameEn,
		keyword,
		description,

		categorySelect,
		selectedCategoryId,
		isEditing,

		// Toast
		toastPendingMessage,
		toastSuccessMessage,
		toastErrorMessage,
		isPending,
		isSucceed,
		isError,
		toastShouldHide,
		toast,
		timeOuts,

		mainCategories,
		subCategories,
		allCategories,

		editingCategory,
		pendingDeleteCategory,

		// Functions
		getParentCategory,
		updateCategory,
		deleteCategory,
		publish
	}
}
