import { ApiProperty } from '@nestjs/swagger'
import { getSchemaPath } from '@nestjs/swagger'

export class InternalErrorRes {
  @ApiProperty({ example: 500 })
  'statusCode': 500

  @ApiProperty({ example: 'Internal server error' })
  'message': 'Internal server error'
}

export class SuccessfullRes {
  @ApiProperty({ example: true })
  'success': true
}

export class BadRequestRes {
  @ApiProperty({ example: 'User already exists' })
  message: string

  @ApiProperty({ example: 'Bad Request' })
  error: 'Bad Request'

  @ApiProperty({ example: 400 })
  statusCode: 400
}

export class UnauthorizedRes {
  @ApiProperty({ example: 'Unauthorized' })
  'message': 'Unauthorized'

  @ApiProperty({ example: 401 })
  'statusCode': 401
}

export const apiResponse200 = {
  description: 'Success',
  status: 200,
  schema: {
    $ref: getSchemaPath(SuccessfullRes)
  }
}

export const apiResponse500 = {
  description: 'Internal server error',
  status: 500,
  schema: {
    $ref: getSchemaPath(InternalErrorRes)
  }
}

export const registerUserApiResponse400 = {
  description: 'Bad request',
  status: 400,
  schema: {
    $ref: getSchemaPath(BadRequestRes)
  }
}

export const apiResponse401 = {
  description: 'Unauthorized',
  status: 401,
  schema: {
    $ref: getSchemaPath(UnauthorizedRes)
  }
}
