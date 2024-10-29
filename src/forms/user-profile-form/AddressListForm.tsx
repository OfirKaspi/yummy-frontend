import { Button } from "@/components/ui/button"
import LoadingButton from "@/components/LoadingButton"
import { Address } from "@/types"
import { useState } from "react"
import AddressFormItem from "./AddressFormItem"
import { showToast } from "@/utils/showToast"

type AddressFormData = {
    addressLine1: string
    city: string
    country: string
}

type Props = {
    addresses: Address[]
    onSave: (addressData: AddressFormData[]) => void
    isLoading: boolean
}

const AddressListForm = ({ addresses, onSave, isLoading }: Props) => {
    const [addressList, setAddressList] = useState<AddressFormData[]>(
        addresses.map((address) => ({
            addressLine1: address.addressLine1,
            city: address.city,
            country: "Israel",
        }))
    )

    const [selectedCities, setSelectedCities] = useState<(string | null)[]>(addressList.map(() => null))
    const [isCityUnchanged, setIsCityUnchanged] = useState<boolean[]>(addressList.map(() => true))

    const handleAddAddress = () => {
        setAddressList([...addressList, { addressLine1: "", city: "", country: "Israel" }])
        setSelectedCities([...selectedCities, null])
        setIsCityUnchanged([...isCityUnchanged, true]) // New address is untouched initially
    }

    const handleRemoveAddress = (index: number) => {
        setAddressList(addressList.filter((_, i) => i !== index))
        setSelectedCities(selectedCities.filter((_, i) => i !== index))
        setIsCityUnchanged(isCityUnchanged.filter((_, i) => i !== index))
    }

    const handleChangeAddress = (data: AddressFormData, index: number) => {
        const updatedAddresses = [...addressList]
        updatedAddresses[index] = data
        setAddressList(updatedAddresses)
    }

    const handleCitySelect = (cityName: string, index: number) => {
        const updatedCities = [...selectedCities]
        updatedCities[index] = cityName
        setSelectedCities(updatedCities)

        const updatedCityUnchanged = [...isCityUnchanged]
        updatedCityUnchanged[index] = false // Mark city as "changed" when a suggestion is selected
        setIsCityUnchanged(updatedCityUnchanged)
    }

    const validateCitySelection = (cityValue: string, selectedCity: string | null) => {
        return cityValue === selectedCity
    }

    const handleSubmit = () => {
        const allValid = addressList.every((address, index) =>
            isCityUnchanged[index] || validateCitySelection(address.city, selectedCities[index])
        )

        if (!allValid) {
            showToast("Please select valid cities from the suggestions for all addresses.", "error")
            return
        }

        onSave(addressList)
    }

    return (
        <div className="space-y-4">
            {addressList.map((address, index) => (
                <AddressFormItem
                    key={index}
                    address={address}
                    onChange={(data) => handleChangeAddress(data, index)}
                    onRemove={() => handleRemoveAddress(index)}
                    onCitySelect={(cityName) => handleCitySelect(cityName, index)}
                    index={index}
                />
            ))}
            <div className="space-x-2">
                <Button type="button" variant="outline" onClick={handleAddAddress}>
                    Add Address
                </Button>
                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button onClick={handleSubmit} className="bg-orange-500">
                        Save All Addresses
                    </Button>
                )}
            </div>
        </div>
    )
}

export default AddressListForm
