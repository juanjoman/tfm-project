import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { encrypt } from 'rocket-encryption-azure-infrastructure'

@Event
export class TestEvent {
  public constructor(readonly id: UUID, @encrypt readonly name: string, readonly array: Array<string>) {}

  public entityID(): UUID {
    return this.id
  }
}
