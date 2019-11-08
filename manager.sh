#! bin/bash
export backup_folder_name=$(date +backup_"%d.%m.%Y")
export folder_list=$(cat folder-list.settings)
backup_destination=$(cat backup-destination.settings)
export manager_destination=$(pwd)

full_destination_path=$backup_destination"/"$backup_folder_name

IFS=','

mkdir -p $full_destination_path



read -ra ADDR <<< "$folder_list" 
for i in "${ADDR[@]}"; do 
    cp -R "$i" "$full_destination_path"
    echo "$i" "$full_destination_path"
done

echo "Backup Complete."