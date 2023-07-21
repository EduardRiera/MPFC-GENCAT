#############################################################################################################################
# Autor: Avanade
# Create on: 20/06/2023
# Modified by:
# Modified on:
#############################################################################################################################
Clear-Host

Write-Host -ForegroundColor DarkRed "#############################################################################################################################"
Write-Host -ForegroundColor DarkRed "#                                                       AVANADE                                                             #"
Write-Host -ForegroundColor DarkRed "#############################################################################################################################"

#Declarations
$preproduccionUrl = "https://eco-mpfc.crm4.dynamics.com/"
$sourceUser = "GGMZNT0003@gencat.cat"
$sourcePassword = "Avanade2023$"

#############################################################################################################################
#   Acciones sobre Datos
#############################################################################################################################

Write-Host 
Write-Host "#############################################################################################################################"
Write-Host 

pac auth create -u $preproduccionUrl -un $sourceUser -p $sourcePassword

Write-Host 
Write-Host "#############################################################################################################################"
Write-Host 
Write-Host "Inicio de la exportación de los datos"
pac data export -sf .\PreSchema.xml -df .\temp.zip -env $preproduccionUrl
Write-host -ForegroundColor blue "Datos importados correctamente"
Expand-Archive -Path temp.zip -DestinationPath .\content -Force
Remove-Item temp.zip
Write-Host -ForegroundColor Red "Ejecucion finalizada"
Write-Host "Press Enter to continue..."
Read-Host