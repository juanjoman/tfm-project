import { Booster } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import { EncryptionRocket } from 'rocket-encryption-azure-infrastructure'

Booster.configure('local', (config: BoosterConfig): void => {
  config.appName = 'tfm-project'
  config.providerPackage = '@boostercloud/framework-provider-local'
})
// Instalar plugin de azure para VSCode
Booster.configure('production', (config: BoosterConfig): void => {
  config.appName = 'tfm-projectp'
  config.providerPackage = '@boostercloud/framework-provider-azure'
  config.rockets = [
    new EncryptionRocket(config, {
      skuName: 'standard',
      // this is picked from your Azure account
      // You can search for "Tenant properties" in Azure's browser
      tenantId: '91a4b568-16dd-4ac8-b8c9-8a8fa4a522bd',
      algorithm: 'RSA1_5',
    }).rocketForAzure(),
  ]
})
