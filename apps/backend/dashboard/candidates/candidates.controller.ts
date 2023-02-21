import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {CandidatesService} from './candidates.service';
import {ApiBody, ApiOperation, ApiResponse} from '@nestjs/swagger';
import JwtAuthenticationGuard from '../auth/guards/auth.guard';
import {CandidatesEntity} from '../entities/candidates.entity';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {editFileName, imageFileFilter} from '../helpers/fileUpload';
import {
  PageDto,
  // PageDto,
  PageOptionsDto,
} from '../pagination';

@UseGuards(JwtAuthenticationGuard)
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get full candidates list',
  })
  @ApiResponse({
    status: 200,
    description: 'An array of candidates objects',
    type: [CandidatesEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getCandidatesList(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<CandidatesEntity>> {
    return this.candidatesService.getCandidatesList(pageOptionsDto);
  }

  @Post('add')
  @ApiOperation({summary: 'Add new candidate'})
  @ApiBody({
    description: 'Fill this fields to add new candidate',
    type: CandidatesEntity,
  })
  @ApiResponse({
    status: 201,
    description: 'The candidate was successfully added to the system.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/avatars',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  public async addCandidate(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() req
  ) {
    return this.candidatesService.addCandidate(
      JSON.parse(req.newCandidate),
      avatar
    );
  }

  @Patch('update')
  @ApiOperation({
    summary: 'Update candidate by pair key-value',
  })
  @ApiBody({
    description:
      'Use one or several of this key fields - just insert the necessary value!',
    type: CandidatesEntity,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated user object',
    type: CandidatesEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/avatars',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  public async updateCandidate(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() req
  ) {
    return this.candidatesService.updateCandidate(
      JSON.parse(req.updatedCandidate),
      avatar
    );
  }

  @ApiOperation({summary: 'Remove candidate from DB by ID'})
  @ApiResponse({
    status: 204,
    description:
      'The candidate with id "id" was successfully removed from system',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Delete('remove/:id')
  public async removeCandidate(@Param('id') id: string) {
    return this.candidatesService.removeCandidate(+id);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get candidate by ID'})
  @ApiResponse({
    status: 200,
    description: 'Candidate object',
    type: CandidatesEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  public async getEmployee(@Param('id') id: string) {
    return this.candidatesService.getCandidateById(+id);
  }
}
