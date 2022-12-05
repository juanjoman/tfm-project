import { Register, UUID } from '@boostercloud/framework-types'
import { TestEvent } from '../events/test'
import { Command } from '@boostercloud/framework-core'

@Command({
  authorize: 'all',
})
export class TestCommand {
  public constructor(readonly name: string, readonly sku: string) {}

  public static async handle(command: TestCommand, register: Register): Promise<void> {
    register.events(new TestEvent(UUID.generate(), command.name, [command.sku]))
  }
}
